import { Dispatch, SetStateAction } from "react";
import {
    DragEndEvent,
    Keyboard
}


export function useTimeBlockDnd(
    items: ITimeBlockResponse[] | undefined,
    setItems: Dispatch<SetStateAction<ITimeBlockResponse[] | undefined>>
) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    )

    const queryClient = useQueryClient()

    const {mutate} = UseMutation({
        mutationKey: ["update order"],
        mutationFn: (ids: string[]) => useTimeBlockService.updateOrderTimeBlock(ids)
        onSucces() {

        }
    })
}