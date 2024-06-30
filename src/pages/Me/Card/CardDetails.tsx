
import Skeleton from 'react-loading-skeleton';
import { useInitDate } from '../hook/UseInitDate';
import { useUpdateSettings } from '../hook/useUpdateSettings';
import type { TypeUserForm } from '../../../types/auth.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Card.module.scss';
import { Button, Card, Form, Input } from 'antd';
import { observer } from 'mobx-react-lite';

const CardDetails = observer(() => {
  const { register, handleSubmit, reset } = useForm<TypeUserForm>({
    mode: 'onChange',
  });

  useInitDate(reset);

  const { isPending, mutate } = useUpdateSettings();

  const onSubmit: SubmitHandler<TypeUserForm> = async (data) => {
    const { password, ...rest } = data;
    console.log('данные изменены')
    try {
      await mutate({
        
        ...rest,
        password: password || undefined,
      });
      reset()
    } catch (error) {
      console.error('Ошибка обновления настроек:', error);
    }
  };

  
  return (
    <Card>
      <Form  className={styles.cardDetailsForm}>
        {isPending ? (
          <Skeleton width={400} height={350} baseColor="#d9d9d9" />
        ) : (
          <>
            <div className={styles.cardDetails}>
              <div className={styles.uploadContainer}>
                <div className={styles.nameInput}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Enter a new name' }]}
                  >
                    <Input
                     {...register('name', { required: 'Enter a new name' })} />
                  </Form.Item>
                </div>
              </div>
              <div>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Enter a new email' }]}
                >
                  <Input
                  {...register('email', { required: 'Enter a new email' })}
                  type="email" />
                </Form.Item>
              </div>
              <div className={styles.passwordInput}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: 'Enter a new password' },
                    { min: 8, message: 'should not be less than 8' }
                  ]}
                >
                  <Input.Password
                    {...register('password', {
                      required: 'Enter a new password',
                      minLength: {
                        value: 8,
                        message: 'should not be less than 8',
                      },
                    })} />
                </Form.Item>
              </div>
              <div className={styles.saveButtonContainer}>
                  <Button
                  onClick={handleSubmit(onSubmit)}
                   type="primary"
                    htmlType="submit"
                     disabled={isPending}
                     >
                    Save
                  </Button>
              </div>
            </div>
          </>
        )}
      </Form>
      </Card>
    );
  });
  
  export default CardDetails;



