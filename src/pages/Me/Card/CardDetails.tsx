import Uploads from '../Uploads';
import Skeleton from 'react-loading-skeleton';
import { useInitDate } from '../hook/UseInitDate';
import { useUpdateSettings } from '../hook/useUpdateSettings';
import type { TypeUserForm } from '../../../types/auth.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Card.module.scss';
import { Button, Input } from 'antd';
import { observer } from 'mobx-react-lite';

const CardDetails = observer(() => {
  const { register, handleSubmit, reset } = useForm<TypeUserForm>({
    mode: 'onChange',
  });

  useInitDate(reset);

  const { isPending, mutate } = useUpdateSettings();

  const onSubmit: SubmitHandler<TypeUserForm> = async (data) => {
    const { password, ...rest } = data;
    try {
      await mutate({
        ...rest,
        password: password || undefined,
      });
    } catch (error) {
      console.error('Ошибка обновления настроек:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.cardDetailsForm}>
      {isPending ? (
        <Skeleton width={400} height={350} baseColor="#d9d9d9" />
      ) : (
        <>
          <div className={styles.cardDetails}>
            <div className={styles.uploadContainer}>
              <Uploads />
              <div className={styles.nameInput}>
                <label htmlFor="name">Name</label>
                <Input
                  {...register('name', { required: 'Enter a new name' })}
                  type="text"
                  id="name"
                  disabled={isPending}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                {...register('email', { required: 'Enter a new email' })}
                type="email"
                id="email"
                disabled={isPending}
              />
            </div>
            <div className={styles.passwordInput}>
              <label htmlFor="password">Password</label>
              <Input
                {...register('password', {
                  required: 'Enter a new password',
                  minLength: {
                    value: 8,
                    message: 'The password cannot be less than 8 characters',
                  },
                })}
                type="password"
                id="password"
                disabled={isPending}
              />
            </div>
            <div className={styles.saveButtonContainer}>
              <Button type="primary" htmlType="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </div>
        </>
      )}
    </form>
  );
})

export default CardDetails;

