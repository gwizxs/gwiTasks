import { useQuery } from "react-query";

import { useEffect, useState } from "react";
import type { ITaskResponse } from "shared/types/task.types";
import { taskService } from "shared/service/task.service";


export function useTasks() {
    const {data, isLoading} = useQuery({
        queryKey: ['tasks'],
        queryFn: () => taskService.getTasks()
    })

    const [items, setItems] = useState<ITaskResponse[] | undefined>(data?.data)

    useEffect(() => {
        setItems(data?.data)
    }, [data?.data])

    return { items, setItems, isLoading }
}