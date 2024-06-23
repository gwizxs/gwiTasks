
import { useEffect } from "react";
import { useProfile } from "../../../hooks/useProfile";
import { UseFormReset } from "react-hook-form";
import { TypeUserForm } from "../../../types/auth.types";


export function useInitDate(reset: UseFormReset<TypeUserForm>) {
    const {isSuccess, data} = useProfile()

    useEffect(() => {
        if(isSuccess && data)
        reset({
            email: data?.user.email,
            name: data?.user.name
            
        })
    }, [data, isSuccess, reset])

}