import { useMutation, useQueryClient } from "react-query";
import type { TypeTimeBlockFormState } from "../../types/time-block.types";
import { timeBlockService } from "../../service/time-block.service";



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