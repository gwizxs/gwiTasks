import { useMutation, useQueryClient } from "react-query";
import { taskService } from "shared/service/task.service";
import { TypeTaskFormState } from "shared/types/task.types";


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
