import { useState, FormEvent } from "react";
import { useMutation } from "react-query";
import { authService, IAuthForm } from "../../service/auth.service";
import { DASHBOARD_PAGES } from "../../config/pages-url.config";
import { toast } from 'sonner';  // Assuming react-toastify is used
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [formData, setFormData] = useState<IAuthForm>({ username: '', password: '' });
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess: () => {
            toast.success("Successfully logged in!");
            navigate(DASHBOARD_PAGES.HOME);
        },
        onError: (error: any) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    const toggleForm = () => setIsLoginForm(!isLoginForm);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        mutate(formData);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <h1>{isLoginForm ? "Login" : "Register"}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">{isLoginForm ? "Login" : "Register"}</button>
            </form>
            <button onClick={toggleForm}>
                Switch to {isLoginForm ? "Register" : "Login"}
            </button>
        </div>
    );
};

export default Auth;
