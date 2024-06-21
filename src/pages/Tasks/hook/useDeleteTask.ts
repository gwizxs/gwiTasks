import { useMutation, useQueryClient } from "react-query";
import {taskService} from "../../../service/task.service";


export default function useDeleteTask() {
    const queryClient = useQueryClient()

    const { mutate: deleteTask, isPending: isDeletePending} = useMutation({
        mutationKey: ['delete task'],
        mutationFn: (id: string) => taskService.deleteTask(id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
    return {deleteTask, isDeletePending}
}