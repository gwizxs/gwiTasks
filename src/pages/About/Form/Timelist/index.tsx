import { DndContext, closestCenter } from "@dnd-kit/core";
import { useTimeBlockDnd } from "../../hook/useTimeBlockDnd";
import { useTimeBlocks } from "../../hook/useTimeBlocks";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TimeBlock } from "../../TimeBlock";
import {CalcTime} from '../../calc-time'
import Skeleton from "react-loading-skeleton";
import styles from './TimeList.module.scss'
import { Flex, Progress } from "antd";

export function TimeBlList() {
  const { items, setItems, isLoading } = useTimeBlocks();
  const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems);
  
  const { hoursTime } = CalcTime(items);

  return (
    <div style={{ marginBottom: '100px' }}>
      {isLoading ? (
        <Skeleton width={600} height={400} baseColor="#d9d9d9" />
      ) : (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div>
              <SortableContext
                items={items || []}
                strategy={verticalListSortingStrategy}
              >
                {items?.length ? (
                  items?.map((item) => (
                    <TimeBlock key={item.id} item={item} />
                  ))
                ) : (
                  <h3 className={styles.emptyState}> 
                    add first time-block
                  </h3>
                )}
              </SortableContext>
            </div>
          </DndContext>
          <Flex  align="center" gap="small" style={{ padding: 20, width: '100%' }}>
          <Progress  percent={Math.round((24 - hoursTime) * 100 / 24)}
           format={(number) => `hours for sleep:  ${hoursTime > 0 ? hoursTime : 'time to sleep'}`}
          size={['100%', 20]}>
</Progress>

</Flex>



        </>
      )}
    </div>
  );
}
