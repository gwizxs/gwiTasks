import { Alert } from 'antd';
import cl from './FormAlert.module.scss'

interface FormStatus {
  message?: string; 
  type: 'success' | 'info' | 'warning' | 'error'; 
}

const FormAlert = ({ formStatus }: { formStatus: FormStatus }) => {
  if (!formStatus.message) return null;

  return (
    <Alert
      message={formStatus.message}
      type={formStatus.type}
      className={cl.Alert}
      showIcon
      banner
    />
  );
};

export default FormAlert;
