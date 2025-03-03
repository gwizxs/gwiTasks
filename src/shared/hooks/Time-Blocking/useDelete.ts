import { useMutation, useQueryClient } from "react-query";
import { timeBlockService } from "shared/service/time-block.service";



export function useDelete(itemId: string) {
    const queryClient = useQueryClient()

    const { mutate: DeleteTimeBl } = useMutation({
        mutationKey: ['delete time-block', itemId],
        mutationFn: () => timeBlockService.deleteTimeBlock(itemId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['time-blocks']
            })
        }
    })
    return {DeleteTimeBl}
}