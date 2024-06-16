import { useState } from "react";
import { useMutation } from "react-query";
import { authService } from "../../service/auth.service";
import { IAuthForm } from "../../types/auth.types";
import { DASHBOARD_PAGES } from "../../config/pages-url.config";
import { toast } from 'sonner';  
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './Auth.scss'
import { Typography } from 'antd';

const { Title } = Typography;


const Auth = observer(() => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [formData, setFormData] = useState<IAuthForm>({ email: '', password: '' });
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess: () => {
            toast.success("Successfully logged in!");
            navigate(DASHBOARD_PAGES.HOME);
        },
    });

    const toggleForm = () => setIsLoginForm(!isLoginForm);

    const onFinish = (values: IAuthForm) => {
        mutate({ ...values, method: isLoginForm ? 'login' : 'register' });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (value: any, allValues: any) => {
        setFormData(allValues);
    };

    return (
      <div className="login-form-container">
      <Title level={2}>{isLoginForm ? 'Login' : 'Register'}</Title>
      <Form
        name="authForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onValuesChange={handleChange}
        className="login-form"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Введите email' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {isLoginForm ? 'Login' : 'Register'}
          </Button>
          <span className="auth-toggle" onClick={toggleForm}>
            {isLoginForm ? 'register now!' : 'login now!'}
          </span>
        </Form.Item>
      </Form>
    </div>
    );
  });

export default Auth;
