import { Dispatch, SetStateAction } from "react";
import {
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { useMutation, useQueryClient } from "react-query";

import {arrayMove} from '@dnd-kit/sortable'
import type { ITimeBlockResponse } from "shared/types/time-block.types";
import { timeBlockService } from "shared/service/time-block.service";


export function useTimeBlockDnd(
    items: ITimeBlockResponse[] | undefined,
    setItems: Dispatch<SetStateAction<ITimeBlockResponse[] | undefined>>
) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const queryClient = useQueryClient();

    const mutation = useMutation((ids: string[]) => timeBlockService.updateOrderTimeBlock(ids), {
        mutationKey: ["update order time block"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['time-blocks']});
        }
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id && items) {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === (over?.id || ''));

            if (oldIndex !== -1 && newIndex !== -1) { 
                const newItems = arrayMove(items, oldIndex, newIndex);

                setItems(newItems);

                mutation.mutate(newItems.map(item => item.id));
            }
        }
    }

    return { handleDragEnd, sensors };
}
