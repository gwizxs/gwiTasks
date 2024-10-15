import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { Select } from "antd";
import styles from './TimeBl.module.scss'
import { useState } from "react";
import { useUpdateTimeBl } from "shared/hooks/Time-Blocking/useUpdateTimeBl";
import { useCreateTimeBl } from "shared/hooks/Time-Blocking/useCreateTimeBl";
import { COLORS } from "features/Time-Block/colors.date";
import type { TypeTimeBlockFormState } from "shared/types/time-block.types";
import { Bounce, toast } from "react-toastify";
import cl from './TimeBl.module.scss'

interface FormError {
  type: string;
}
interface FormErrors {
  name?: FormError;
  duration?: FormError;
}


function TimeBlForm() {
  const { register, control, watch, reset, handleSubmit, formState: { errors } } =
    useFormContext<TypeTimeBlockFormState>();

  const existsId = watch('id');

  const { UpdateTimeBl, isLoading } = useUpdateTimeBl(existsId);
  const { CreateTimeBl } = useCreateTimeBl();
  const [errorBl, setErrorBl] = useState('');

  const onSubmit: SubmitHandler<TypeTimeBlockFormState> = (data) => {
    const { color, id, ...rest } = data;
    const dto = { ...rest, color: color || undefined };

    if (id) {
      UpdateTimeBl({
        id,
        data: dto,
      });
    } else {
      CreateTimeBl(dto);
    }
    reset({
      color: COLORS[COLORS.length - 1],
      duration: 0,
      name: '',
      id: undefined,
      order: 1,
    });
  };
  // ----------убираем красный текст если пользователь сделал все правильно ------------------
  // --------------------------------------------------------------------------------------------


  const handleError = (errors: FormErrors) => {
    if (errors.name?.type === 'required') {
      setErrorBl("Please enter a task name");
    } else if (errors.duration?.type === 'required') {
      setErrorBl("Please enter time");
    } else if (!existsId) {
      setErrorBl('');
    } if (errors.name?.type === 'required' && errors.duration?.type === 'required') {
      setErrorBl("Please enter time and task name");
    }
  };

  return (
    <form >
      {errorBl && (
        toast.error(errorBl, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce
        })
      )}
      <input
        className={styles.timeBlInput}
        {...register('name', {
          required: true,
        })}
        type="text"
        placeholder="Enter task"
        disabled={isLoading}
      />
      {errors.name && <span className={styles.error}>{errors.name.message}</span>}

      <input
        className={styles.timeBlInput}
        {...register('duration', {
          required: true,
          valueAsNumber: true,
        })}
        type="number"
        placeholder="Enter time"
        disabled={isLoading}
      />
      {errors.duration && (
        toast.error(errors.duration.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce
        })
      )}

      <div className={cl.color}>
        <span className={cl.colorSpan}>color:</span>


        <Controller
          control={control}
          name="color"
          render={({ field: { value, onChange } }) => (
            <Select
              options={COLORS.map((item) => ({
                value: item,
                label: item,
              }))}
              onChange={onChange}
              value={value || COLORS[COLORS.length - 1]}
            />
          )}
        />
      </div>
      <button
        onClick={handleSubmit(onSubmit, handleError)}
        className={styles.submitBtn}
        type="submit"
      >
        {existsId ? 'Update' : 'Create'}
      </button>
    </form>
  );
}

export default TimeBlForm;