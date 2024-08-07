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
import styles from './Auth.module.scss'
import { Typography } from 'antd';

const { Title } = Typography;

const Auth = observer(() => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const setFormData = useState<IAuthForm>({ email: '', password: '' })[1] as React.Dispatch<React.SetStateAction<IAuthForm>>;
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess: () => {
            toast.success("Successfully logged in!");
            navigate(DASHBOARD_PAGES.HOME);
        },
        onError: () => {
          setError("Incorrect email or password. Try again");
          toast.error("Incorrect email or password. Try again");
      }
    });

    const toggleForm = () => setIsLoginForm(!isLoginForm);

    const onFinish = (values: IAuthForm) => {
        mutate({ ...values, method: isLoginForm ? 'login' : 'register' });
    };

    const handleChange = (allValues: IAuthForm) => {
        setFormData(allValues);
    };


    return (
      <div className={styles.loginFormContainer}>
      <Title level={2}>{isLoginForm ? 'Login' : 'Register'}</Title>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <Form
        name="authForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onValuesChange={handleChange}
        className={styles.loginForm}
      >
        <Form.Item
          validateFirst
          hasFeedback
          validateDebounce={1500}
          name="email"
          rules={[{ required: true, message: 'enter email' }]}
        >
          <Input prefix={<UserOutlined className={styles.siteFormItemIcon} />} placeholder="Email" />
        </Form.Item>
        <Form.Item
                  validateFirst
                  hasFeedback
          name="password"
          rules={[
            { required: true, message: 'enter password' },
          { min: 8, message: 'The password must be at least 8 characters' }
        ]}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.siteFormItemIcon} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton} >
            {isLoginForm ? 'Login' : 'Register'}
          </Button>
          <span className={styles.authToggle} onClick={toggleForm}>
            {isLoginForm ? 'register now!' : 'login now!'}
          </span>
        </Form.Item>
      </Form>
    </div>
    );
  });

export default Auth;
