import { useMutation, useQueryClient } from "react-query"
import { taskService } from "shared/service/task.service"
import { TypeTaskFormState } from "shared/types/task.types"


export function UseCreateTask() {
    const queryClient = useQueryClient()

    const { mutate: createTask} = useMutation({
        mutationKey: ['create task'],
        mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
        onSuccess() {
            queryClient.invalidateQueries({
             queryKey: ['tasks']
            })
        }
    })
    return {createTask}
}