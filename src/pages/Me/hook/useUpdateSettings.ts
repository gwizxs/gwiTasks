import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TypeUserForm } from "../../../types/auth.types";
import { userService } from "../../../service/user.service";
import { toast } from "sonner";



export function useUpdateSettings() {
    const QueryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationKey: ['update profile'],
        mutationFn: (data: TypeUserForm) => userService.update(data),
        onSuccess() {
            toast.success('success')
            QueryClient.invalidateQueries({ queryKey: ['profile']})
        }
    })

    return { mutate, isPending}
}