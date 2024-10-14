import { useMutation, useQueryClient } from "react-query";
import { TypeUserForm } from "../../../types/auth.types";
import { userService } from "../../../service/user.service";
import { toast } from "sonner";

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
