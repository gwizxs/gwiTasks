import { useQuery } from "react-query";
import TaskService from "../../../service/task.service";
import { useEffect, useState } from "react";
import { ITaskResponse } from "../../../types/task.types";


export function useTask() {
    const {data} = useQuery({
        queryKey: ['tasks'],
        queryFn: () => TaskService.getTasks()
    })

    const [items, setItems] = useState<ITaskResponse[] || undefined>(data?.data)

    useEffect(() => {
        setItems(data?.data)
    }, [data?.data])

    return { items, setItems }
}