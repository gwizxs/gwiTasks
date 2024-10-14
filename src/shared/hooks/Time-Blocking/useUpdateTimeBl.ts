
import { useMutation, useQueryClient } from "react-query";
import { timeBlockService } from "shared/service/time-block.service";
import type { TypeTimeBlockFormState } from "shared/types/time-block.types";




export function useUpdateTimeBl(key?: string) {
    const queryClient = useQueryClient()

    const {mutate: UpdateTimeBl, isLoading} = useMutation({
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
        UpdateTimeBl,
        isLoading
    }
}