import { useMutation, useQueryClient } from "react-query"
import { TypeTaskFormState } from "../../../types/task.types"
import TaskService from "../../../service/task.service"

export function UseCreateTask() {
    const queryClient = useQueryClient()

    const { mutate: createTask} = useMutation({
        mutationKey: ['create task'],
        mutationFn: (data: TypeTaskFormState) => TaskService.createTask(data),
        onSuccess() {
            queryClient.invalidateQueries({
             queryKey: ['tasks']
            })
        }
    })
    return {createTask}
}