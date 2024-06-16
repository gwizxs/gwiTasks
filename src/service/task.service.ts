import type { ITaskResponse, TypeTaskFormState } from "../types/task.types";
import { axiosWithAuth } from "../api/interceptors";

class TaskService {
    static createTask(data: Partial<Omit<ITaskResponse, "id" | "updatedAt">>): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    private BASE_URL = '/user/tasks';

    async getTasks() {
        const response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL);
        return response;
    }

    async createTask(data: TypeTaskFormState) {
        const response = await axiosWithAuth.post<ITaskResponse>(this.BASE_URL, data);
        return response;
    }

    async updateTask(id: string, data: TypeTaskFormState) {
        const response = await axiosWithAuth.put<ITaskResponse>(`${this.BASE_URL}/${id}`, data);
        return response;
    }

    async deleteTask(id: string) {
        const response = await axiosWithAuth.delete<ITaskResponse>(`${this.BASE_URL}/${id}`);
        return response;
    }
}

export default TaskService;
