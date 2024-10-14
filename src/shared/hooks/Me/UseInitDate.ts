
import { useEffect } from "react";
import { useProfile } from "../useProfile";
import { UseFormReset } from "react-hook-form";
import type { TypeUserForm } from "shared/types/auth.types";


export function useInitDate(reset: UseFormReset<TypeUserForm>) {
    const { data, isSuccess} = useProfile()

    useEffect(() => {
        if(isSuccess && data)
        reset({
            email: data.user.email,
            name: data.user.name,
        })
    }, [isSuccess])
}