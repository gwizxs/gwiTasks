import { axiosClassic } from "../api/interceptors";
import { IAuthForm, IAuthResponse } from "../types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

export const authService = {
    async main(type: 'login' | 'register', data: IAuthForm ) {
        const responce = await axiosClassic.post<IAuthResponse>(
            `/auth/${type}`,
            data
        )

        if (responce.data.accessToken) saveTokenStorage(responce.data.accessToken)

            return responce
    },

    async getNewTokens() {
        const responce = await axiosClassic.post<IAuthResponse>(
            '/auth/login/access-token'
        )

        if (responce.data.accessToken) saveTokenStorage(responce.data.accessToken)

            return responce
    },

    async logout() {
        const responce = await axiosClassic.post<boolean>('/auth/logout')

        if (responce.data) removeFromStorage()

            return responce
    }
}