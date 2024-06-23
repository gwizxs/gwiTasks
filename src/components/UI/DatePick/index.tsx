
import { ConfigProvider, DatePicker, Space, } from 'antd';

interface DatePickInterface {
  value: string | '',
  onChange: () => void
}

const DatePickerComponent = ({ onChange, value}: DatePickInterface) => (
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
      <DatePicker
       onChange={onChange} />
    </ConfigProvider>
  </Space>
);

export default DatePickerComponent;

