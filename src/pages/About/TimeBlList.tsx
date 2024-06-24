import { DndContext, closestCenter } from "@dnd-kit/core";
import { useTimeBlockDnd } from "./hook/useTimeBlockDnd";
import { useTimeBlocks } from "./hook/useTimeBlocks";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TimeBlock } from "./TimeBlock";
import {CalcTime} from './calc-time'
import Skeleton from "react-loading-skeleton";



export function TimeBlList() {
    const { items, setItems, isLoading} = useTimeBlocks()
    const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems)
    
    const {hoursTime} = CalcTime(items)


    return (
        <div style={{marginBottom: '100px'}}>
          {isLoading ? (
        <Skeleton width={500} height={400} baseColor="#d6e4ff" />

    ) : (
      <>
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
    height: '10%'
    
  }}>
                {hoursTime > 0
                ? `${hoursTime} hours of 24 left for sleep`
            : 'No hours left for sleep'}
            </div>
            </>
    )}
        </div>
    )
}