import { ITimeBlockResponse } from "../../../types/time-block.types"


export function CalcTime(items: ITimeBlockResponse[] | undefined) {
    const totalMinutes = items?.reduce((acc, item) => acc + item.duration, 0) || 0
    const totalHours = Math.floor(totalMinutes / 60)
    const hoursTime = 24 - totalHours

    return {hoursTime}
}