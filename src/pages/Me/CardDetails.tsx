
import { Button, Card, Form, Input } from 'antd';
import Uploads from './Uploads';

import Skeleton from 'react-loading-skeleton';
import { useInitDate } from "../Me/hook/UseInitDate";
import { useUpdateSettings } from "../Me/hook/useUpdateSettings";
import { TypeUserForm } from '../../types/auth.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';



const CardDetails = observer(() => {

  const { register, handleSubmit, reset } = useForm<TypeUserForm>({
    mode: 'onChange'
})

useInitDate(reset)

const {isPending, mutate} = useUpdateSettings()

const onSubmit: SubmitHandler<TypeUserForm> = data => {
    const { password, ...rest} = data

    mutate({
        ...rest,
        password: password || undefined
    })
}

  


  return (
    <Form
    layout="vertical"
    onFinish={handleSubmit(onSubmit)}>
            {isPending ? (
        <Skeleton width={400} height={350} baseColor="#d9d9d9" />
      ) : (
        <>
      <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <Uploads />
          <div style={{marginLeft: 10}}>
          <Form.Item
          label="имя"
          id="name"
          {...register('name')} 
          validateFirst
          hasFeedback
          rules={[
            { required: true, message: 'введите новое имя' }
          ]}
          
        >
          <Input/>
        </Form.Item>
        </div>
        </div>
        <Form.Item
          label="почта"
          id="email"
          {...register('email', {
            required: 'Email is required'
        })} 
          validateFirst
          hasFeedback
          rules={[
            { required: true, message: 'введите новую почту' }
          ]}
          
        >
          <Input/>
        </Form.Item>
        
        <Form.Item
          label="пароль"
          id="password"
          {...register('password')} 
          validateFirst
          hasFeedback
            rules={[
            { min: 8,  message: 'пароль не может быть меньше 8 символов' },
            { required: true, message: 'введите новый пароль' }
          ]}
          style={{ marginTop: 20 }} 
        >
          <Input.Password />
        </Form.Item>
        <div>
          <div style={{ marginTop: 40, float: 'right' }}>
          <Button
            disabled={isPending}
            >Save</Button>
          </div>
        </div>
      </Card>
      </>
      )}
    </Form>
  );
})

export default CardDetails;
