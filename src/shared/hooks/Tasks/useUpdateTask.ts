import { useMutation, useQueryClient } from "react-query";
import {taskService} from "../../../service/task.service";
import { TypeTaskFormState } from "../../../types/task.types";

export function useUpdateTask(key?: string) {
    const queryClient = useQueryClient();
  
    const { mutate: updateTask } = useMutation({
      mutationKey: ['update task', key],
      mutationFn: ({ id, data }: { id: string, data: TypeTaskFormState }) => 
          taskService.updateTask(id, data),
      onSuccess() {
          queryClient.invalidateQueries({
              queryKey: ['tasks']
          });
      }
    });
  
    return { updateTask };
}
