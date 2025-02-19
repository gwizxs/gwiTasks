import { Alert } from 'antd';
import cl from './FormAlert.module.scss';

interface FormStatus {
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

const FormAlert: React.FC<FormStatus> = ({ message, type }) => {
  if (!message || !type) return null;

  return (
    <Alert
      message={message}
      type={type}
      className={cl.Alert}
      showIcon
      banner
    />
  );
};

export default FormAlert;

