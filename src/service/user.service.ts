import { axiosWithAuth } from "../api/interceptors";
import { IUser, TypeUserForm } from "../types/auth.types";

export interface IProfileResponse {
    user: IUser;
    statistics: {
        label: string;
        value: string;
    }[];
}

class UserService {
    private BASE_URL = '/user/profile';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getProfile: any;

    async getProfile() {
        const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL);
        return response.data;
    }

    async update(data: TypeUserForm) {
        const response = await axiosWithAuth.put<IProfileResponse>(this.BASE_URL, data);
        return response.data;
    }
}


export default UserService;
