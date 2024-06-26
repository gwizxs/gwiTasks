import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TypeUserForm } from "../../../types/auth.types";
import { userService } from "../../../service/user.service";


export function useUpdateSettings() {
    const queryClient =  useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationKey: ['update profile'],
        mutationFn: (data: TypeUserForm) => userService.update(data),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['profile']})
        }
    })

    return { mutate, isPending}
}