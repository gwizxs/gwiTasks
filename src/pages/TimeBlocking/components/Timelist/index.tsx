import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Skeleton from "react-loading-skeleton";
import styles from './TimeList.module.scss'
import { Flex, Progress } from "antd";
import { CalcTime } from "features/Time-Block/calc-time";
import { useTimeBlocks } from "shared/hooks/Time-Blocking/useTimeBlocks";
import { useTimeBlockDnd } from "shared/hooks/Time-Blocking/useTimeBlockDnd";
import { observer } from "mobx-react-lite";
import TimeBlocking from "../TimeBlock/TimeBlocking";
import { TimeBlock } from "./timeBlock";

export const TimeBlList = observer(() => { 
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
                    <TimeBlock
                    key={item.id}
                    item={item}
                    />
                  ))
                ) : (
                  <h3 className={styles.emptyState}>
                    add first time-block
                  </h3>
                )}
              </SortableContext>
            </div>
          </DndContext>
          <Flex align="center" gap="small" style={{ padding: 20, width: '100%' }}>
            <Progress percent={Math.round((24 - hoursTime) * 100 / 24)}
              format={() => `hours for sleep:  ${hoursTime > 0 ? hoursTime : 'time to sleep'}`}
              size={['100%', 20]}>
            </Progress>
          </Flex>
        </>
      )}
    </div>
  );
})
