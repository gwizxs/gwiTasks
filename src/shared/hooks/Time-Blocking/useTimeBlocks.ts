import { useQuery } from "react-query"
import { timeBlockService } from "../../../service/time-block.service"
import { useEffect, useState } from "react"
import { ITimeBlockResponse } from "../../../types/time-block.types"


export const useTimeBlocks = () => {
    const { data, isLoading} = useQuery({
    queryKey: ['time-blocks'],
    queryFn: () => timeBlockService.getTimeBlocks()
    })

    const [items, setItems] = useState<ITimeBlockResponse[] | undefined> (
        data?.data
    )

    useEffect(() => {
        setItems(data?.data)
    }, [data?.data])

    return  {items, setItems, isLoading}
}