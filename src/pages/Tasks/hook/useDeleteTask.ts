import {  useMutation, useQueryClient } from "react-query";
import TaskService from "../../../service/task.service";


export default function useDeleteTask() {
    const queryClient = useQueryClient(),

    const { mutate: deleteTask, isPending: isDeletePending} = useMutation({
        mutationKey: ['delete task'],
        mutationFn: (id: string) => TaskService.deleteTask(id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
    return {deleteTask, isDeletePending}
}