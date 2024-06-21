
import { useMutation, useQueryClient } from "react-query";
import type { TypeTimeBlockFormState } from "../../types/time-block.types";
import { timeBlockService } from "../../service/time-block.service";



export function useUpdateTimeBl(key?: string) {
    const queryClient = useQueryClient()

    const {mutate: UpdateTimeBl} = useMutation({
        mutationKey: ['create time-block', key],
        mutationFn: ({id, data}: {id: string, data: TypeTimeBlockFormState}) => 
            timeBlockService.updateTimeBlock(id,data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['time-blocks']
            })
        }
    })

    return {
        UpdateTimeBl
    }
}