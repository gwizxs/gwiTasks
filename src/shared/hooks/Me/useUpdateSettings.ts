import { useMutation, useQueryClient } from "react-query";
import { userService } from "shared/service/user.service";
import { toast } from "sonner";
import type { TypeUserForm } from "shared/types/auth.types";

interface Errors {
    message: string; 
}

export function useUpdateSettings() {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationKey: ['update profile'],
        mutationFn: (data: TypeUserForm) => userService.update(data),
        onSuccess() {
            toast.success('Success');
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (error: Errors) => {
            toast.error(`Update failed: ${error.message}`); 
        }
    });

    return { mutate, isLoading };
}
