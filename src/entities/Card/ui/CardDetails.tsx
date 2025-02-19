import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useInitDate } from 'shared/hooks/Me/UseInitDate';
import { useUpdateSettings } from 'shared/hooks/Me/useUpdateSettings';
import type { TypeUserForm } from 'shared/types/auth.types';
import { Card} from 'antd';
import styles from './Card.module.scss';
import Uploads from 'pages/Me/Uploads';
import { useState } from 'react';
import FormAlert from 'features/Form-alert/ui/FormAlert';
import handleFormErrors from 'features/Form-alert/components/handleFormErrors';



const CardDetails = observer(() => {
  const { register, handleSubmit, reset } = useForm<TypeUserForm>({
    mode: 'onChange',
  });
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const { isLoading, mutate } = useUpdateSettings();
  useInitDate(reset);



  const onSubmit = async (data: any) => {
    console.log('Data updated');
    try {
      await mutate({
        ...data,
        password: data.password || undefined,
      });
      setFormStatus({ message: 'Settings updated!', type: 'success' });
    } catch (error) {
      console.error('Error updating settings:', error);
      setFormStatus({ message: 'Error updating settings', type: 'error' });
    }
  };

  return (
    <>
      <Card className={styles.cards} >

        <form onSubmit={handleSubmit(onSubmit,
           (errors) => setFormStatus(handleFormErrors(errors)))}
            className={styles.cardDetailsForm}>
                  <FormAlert message={formStatus.message} type={formStatus.type as 'error' | 'success' | 'info' | 'warning'} />

          {isLoading ? (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#d9d9d9' }} />
          ) : (
            <div className={styles.cardDetails}>
              <div className={styles.uploadContainer}>
                <Uploads />
                <div className={styles.nameInput}>
                  <label htmlFor="name">new Name</label>
                  <input
                    className={styles.InputMe}
                    id="name"
                    type="text"
                    {...register('name', { required: 'Enter a new name' })}
                  />
                </div>
              </div>
              <div className={styles.emailInput}>
                <label htmlFor="email">new Email</label>
                <input
                  className={styles.InputMe}
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Enter a new email',
                  })}
                />
              </div>
              <div className={styles.passwordInput}>
                <label htmlFor="password">new Password</label>
                <input
                  className={styles.InputMe}
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Enter a new password',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  })}
                />
              </div>
              <div className={styles.saveButtonContainer}>
                <button
                  className={styles.submitButton}
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </>
  );
});

export default CardDetails;
