import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import type { TypeTimeBlockFormState } from "../../../../types/time-block.types";
import { useUpdateTimeBl } from "../../hook/useUpdateTimeBl";
import { useCreateTimeBl } from "../../hook/useCreateTimeBl";
import { COLORS } from "../../colors.date";
import { Select } from "antd";
import styles from './TimeBl.module.scss'
import {  useState } from "react";

function TimeBlForm() {
  const { register, control, watch, reset, handleSubmit, formState: { errors } } =
    useFormContext<TypeTimeBlockFormState>();

  const existsId = watch('id');

  const { UpdateTimeBl, isLoading } = useUpdateTimeBl(existsId);
  const { CreateTimeBl, isPending } = useCreateTimeBl();
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

  
  const handleError = (errors) => {
     if (errors.name?.type === 'required') {
      setErrorBl("Please enter a task name");
    } else if (errors.duration?.type === 'required') {
      setErrorBl("Please enter time");
    }  else if (!existsId && !isPending) { 
      setErrorBl('');
    } if (errors.name?.type === 'required' && errors.duration?.type === 'required') {
      setErrorBl("Please enter time and task name");
    }
  };

  return (
    <form >
          {errorBl && <div style={{ color: 'red', marginBottom: '10px' }}>{errorBl}</div>} 
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
      {errors.duration && <h3 style={{ color: 'red', marginBottom: '10px' }} className={styles.error}>{errors.duration.message}</h3>}

      <div style={{ marginTop: 30 }}>
        <span style={{  marginRight: 9 }}>color:</span>

        
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
        disabled={isPending}
      >
        {existsId ? 'Update' : 'Create'}
      </button>
    </form>
  );
}

export default TimeBlForm;