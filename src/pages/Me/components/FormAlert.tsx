
import { Alert } from 'antd';

const FormAlert = ({ formStatus }) => {
  if (!formStatus.message) return null;

  return (
    <Alert
      message={formStatus.message}
      type={formStatus.type}
      style={{ marginBottom: '10px' }}
      showIcon
      banner
    />
  );
};

export default FormAlert;
