import { DndContext, closestCenter } from "@dnd-kit/core";
import { useTimeBlockDnd } from "./hook/useTimeBlockDnd";
import { useTimeBlocks } from "./hook/useTimeBlocks";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TimeBlock } from "./TimeBlock";
import {CalcTime} from './calc-time'
import { Spin } from "antd";



export function TimeBlList() {
    const { items, setItems, isLoading} = useTimeBlocks()
    const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems)
    
    const {hoursTime} = CalcTime(items)

    if (isLoading) {
        return <Spin/>
    }


    return (
        <div style={{border: '1px solid #e6f7ff'}}>
            <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
                <div>
                    <SortableContext
                    items={items || []}
                    strategy={verticalListSortingStrategy}>
                        {items?.length ? (
                            items?.map(item => (
                                <TimeBlock
                                key={item.id}
                                item={item}
                                />
                            ))
                        ) : (
                            <h1 style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                                width: '100%',
                                height: 100,
                                backgroundColor: '#f9f0ff',
                            }}>add first time-block</h1>
                        )}
                    </SortableContext>
                </div>
            </DndContext>
            <div style={{
    backgroundColor: '#ffbb96',  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }}>
                {hoursTime > 0
                ? `${hoursTime} hours of 24 left for sleep`
            : 'No hours left for sleep'}
            </div>
        </div>
    )
}