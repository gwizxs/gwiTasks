import { useMutation, useQueryClient } from "react-query"
import { TypeTaskFormState } from "../../../types/task.types"
import {taskService} from "../../../service/task.service"

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