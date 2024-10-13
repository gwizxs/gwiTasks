import { axiosClassic } from "../api/interceptors";
import { IAuthForm, IAuthResponse } from "../types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

export const authService = {
    async main(type: 'login' | 'register', data: IAuthForm) {
        try {
            const response = await axiosClassic.post<IAuthResponse>(
                `/auth/${type}`,
                data
            );
            if (response.data.accessToken) {
                saveTokenStorage(response.data.accessToken);
            }
            return response;
        } catch (error) {
            console.error("Error in main authentication process:", error);
            throw error; 
        }
    },

    async getNewTokens() {
        try {
            const response = await axiosClassic.post<IAuthResponse>(
                '/auth/login/access-token'
            );
            if (response.data.accessToken) {
                saveTokenStorage(response.data.accessToken);
            }
            return response;
        } catch (error) {
            console.error("Error in refreshing tokens:", error);
            throw error;
        }
    },

    async logout() {
        try {
            const response = await axiosClassic.post<boolean>('/auth/logout');
            if (response.data) {
                removeFromStorage();
            }
            return response;
        } catch (error) {
            console.error("Error during logout:", error);
            throw error;
        }
    }
};
