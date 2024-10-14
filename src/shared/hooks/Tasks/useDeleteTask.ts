import { useMutation, useQueryClient } from "react-query";
import { taskService } from "shared/service/task.service";



export default function useDeleteTask() {
    const queryClient = useQueryClient()

    const { mutate: deleteTask} = useMutation({
        mutationKey: ['delete task'],
        mutationFn: (id: string) => taskService.deleteTask(id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
    return {deleteTask}
}