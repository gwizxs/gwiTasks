import { useMutation, useQueryClient } from "react-query";
import { timeBlockService } from "shared/service/time-block.service";
import type { TypeTimeBlockFormState } from "shared/types/time-block.types";




export function useCreateTimeBl() {
    const queryClient = useQueryClient()

    const {mutate: CreateTimeBl} = useMutation({
        mutationKey: ['create time-block'],
        mutationFn: (data: TypeTimeBlockFormState) => 
            timeBlockService.createTimeBlock(data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['time-blocks']
            })
        }
    })

    return {
        CreateTimeBl,
    }
}