
import { ConfigProvider, Space,  Checkbox } from 'antd';

const CheckboxComponent = ({ onChange, checked }) => (
  <Space>
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: '#5b8c00',
          },
        },
      }}
    >
      <Checkbox 
       checked={checked} 
       onChange={onChange} />
    </ConfigProvider>
  </Space>
);

export default CheckboxComponent;

