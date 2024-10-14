import { useMutation, useQueryClient } from "react-query";
import { userService } from "shared/service/user.service";
import { toast } from "sonner";
import type { TypeUserForm } from "shared/types/auth.types";

export function useUpdateSettings() {
    const queryClient =  useQueryClient()
    const {mutate, isLoading} = useMutation({
        mutationKey: ['update profile'],
        mutationFn: (data: TypeUserForm) => userService.update(data),
        onSuccess() {
            toast.success('success')
            queryClient.invalidateQueries({ queryKey: ['profile']})
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast.error(`update failed: ${error.message}`)
        }
    })

    return { mutate, isLoading}
}
