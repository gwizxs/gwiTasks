import { ConfigProvider, Input, Space } from "antd"

interface InputComponentProps {
  id?: string; 
  placeholder: string
  
}

const InputComponent = ({id, placeholder, ...rest}: InputComponentProps) => {
    return (
        <Space>
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorPrimary: '#5b8c00',
          },
        },
      }}
    >
        <Input  placeholder={placeholder} id={id} {...rest}>
        </Input>
        </ConfigProvider>
        </Space>
    )
}

export default InputComponent;