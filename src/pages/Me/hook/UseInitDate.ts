
import { useEffect } from "react";
import { useProfile } from "../../../hooks/useProfile";
import { UseFormReset } from "react-hook-form";
import type { TypeUserForm } from "../../../types/auth.types";


export function useInitDate(reset: UseFormReset<TypeUserForm>) {
    const { data, isSuccess} = useProfile()

    useEffect(() => {
        if(isSuccess && data)
        reset({
            email: data?.user.email,
            name: data?.user.name
            
        })
    }, [data, isSuccess, reset])

}