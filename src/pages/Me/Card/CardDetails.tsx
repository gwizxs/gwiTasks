import { Card, Form, Input } from 'antd';
import Uploads from '../Uploads';
import Skeleton from 'react-loading-skeleton';
import { useInitDate } from "../hook/UseInitDate";
import { useUpdateSettings } from "../hook/useUpdateSettings";
import { TypeUserForm } from '../../../types/auth.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import styles from './Card.module.scss';

const CardDetails = observer(() => {
  const { register, handleSubmit, reset } = useForm<TypeUserForm>({
    mode: 'onChange'
  });

  useInitDate(reset);

  const { isPending, mutate } = useUpdateSettings();

  const onSubmit: SubmitHandler<TypeUserForm> = data => {
    const { password, ...rest } = data;

    mutate({
      ...rest,
      password: password 
    });
  };

  return (
    <Form
      layout="vertical"
      className={styles.carDetailsForm}
    >
      {isPending ? (
        <Skeleton width={400} height={350} baseColor="#d9d9d9" />
      ) : (
        <>
          <Card className={styles.cardDetails}>
            <div className={styles.uploadContainer}>
              <Uploads />
              <div className={styles.nameInput}>
                <Form.Item
                  label="имя"
                  id="name"
                  validateFirst
                  hasFeedback
                  rules={[
                    { required: true, message: 'введите новое имя' }
                  ]}
                >
                  <Input
                    {...register('name')}
                  ></Input>
                </Form.Item>
              </div>
            </div>
            <Form.Item
              label="почта"
              id="email"
              validateFirst
              hasFeedback
              rules={[
                { required: true, message: 'введите новую почту' }
              ]}
            >
              <Input
                {...register('email', {
                  required: true
                })}
              ></Input>
            </Form.Item>
            <Form.Item
              label="пароль"
              id="password"
              validateFirst
              hasFeedback
              rules={[
                { min: 8, message: 'пароль не может быть меньше 8 символов' },
                { required: true, message: 'введите новый пароль' }
              ]}
              className={styles.passwordInput}
            >
              <Input.Password
                {...register('password')}
              ></Input.Password>
            </Form.Item>
            <div className={styles.saveButtonContainer}>
              <button
                type='submit'
                disabled={isPending}
                onChange={() => handleSubmit(onSubmit)}
              >
                Save
              </button>
            </div>
          </Card>
        </>
      )}
    </Form>
  );
});

export default CardDetails;
