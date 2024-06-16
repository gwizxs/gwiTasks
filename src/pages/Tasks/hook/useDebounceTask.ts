import { debounce } from "@material-ui/core";
import { useCallback, useEffect } from "react";
import { TypeTaskFormState } from "../../../types/task.types";
import { useUpdateTask } from "./useUpdateTask";
import { UseCreateTask } from "./useCreateTask";


interface IUseDeb {
    watch: UseForWatch<TypeTaskFormState>
    itemsId: string
}

export function useDebounceTask({watch, itemsId}: IUseDeb) {

    const {createTask} = UseCreateTask()
    const {updateTask} = useUpdateTask()


    const debouncedCreateTask = useCallback(
        debounce((FormData: TypeTaskFormState) => {
            createTask(FormData)
        }, 500),
        []
    )

    const debounceUpdateTask = useCallback(
        debounce((FormData: TypeTaskFormState) => {
            updateTask(id: itemsId, data: FormData)
        }, 500),
        []
    )

    useEffect(() => {
        const {unsubscribe} = (FormData => {
            if (itemsId) {
                debounceUpdateTask({
                    ...formData,
                    priority: FormData.priority || undefined
                })
            } else {
                debounceCreateTask(FormData)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [watch(), debounceUpdateTask, debounceCreateTask])
}