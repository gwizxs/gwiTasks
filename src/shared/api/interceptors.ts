import axios, { type CreateAxiosDefaults } from "axios";
import { getAccessToken, removeFromStorage } from "../service/auth-token.service";
import { errorCatch } from "./errors";
import { authService } from "../service/auth.service";
import { Bounce, toast } from "react-toastify";



const options: CreateAxiosDefaults = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true

}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)


axiosWithAuth.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken()

        if (config?.headers && accessToken)
            config.headers.Authorization = `Bearer ${accessToken}`

        return config
    },
    (error) => { return Promise.reject(error) }
)
axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config;

        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await authService.getNewTokens();
                return axiosWithAuth.request(originalRequest);
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') {
                    removeFromStorage();
                    toast.error('Сессия истекла. Пожалуйста, авторизуйтесь снова.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        transition: Bounce
                    });
                }
            }
        }
        if (error.response && error.response.data && error.response.data.status !== 200) {
            const message = error.response.data.message || 'Произошла ошибка';
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce
            });
        }

        return Promise.reject(error); 
    }
);



export { axiosClassic, axiosWithAuth }