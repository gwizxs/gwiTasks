import { useFormContext } from "react-hook-form";
import type { ITimeBlockResponse, TypeTimeBlockFormState } from "../../../types/time-block.types";
import { useSortBl } from "../hook/useSortBl";
import { useDelete } from "../hook/useDelete";
import { Button, Spin } from "antd";
import { DeleteOutlined, EditOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import styles from "./TimeBlock.module.scss";

export function TimeBlock({ item }: { item: ITimeBlockResponse }) {
  const { attributes, listeners, setNodeRef, style } = useSortBl(item.id);

  const { reset } = useFormContext<TypeTimeBlockFormState>();

  const { DeleteTimeBl, isDeletePending } = useDelete(item.id);

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={styles.block}
        style={{
          backgroundColor: item.color || '#e6f7ff',
          height: item.duration < 120 ? '120px' : `${item.duration}px`,
        }}
      >
        <div>
          <Button
            type="text"
            icon={<VerticalAlignMiddleOutlined style={{ color: 'black' }} />}
            {...attributes}
            {...listeners}
            aria-describedby="time-block"
          ></Button>
          <div className={styles.blockContent}> 
            <div className={styles.blockInfo}> 
              <div className={styles.blockHeader}> 
                <div className={styles.blockName}> 
                  <span>{item.name}</span>
                </div>
                <div className={styles.blockActions}> 
                  <Button
                    type="text"
                    icon={<EditOutlined style={{ color: 'black' }} />}
                    onClick={() => {
                      console.log('Resetting with values:', item);
                      reset({
                        id: item.id,
                        color: item.color,
                        duration: item.duration,
                        name: item.name,
                        order: item.order,
                      });
                    }}
                  ></Button>

                  <Button type="text" onClick={() => DeleteTimeBl()}>
                    {isDeletePending ? <Spin/> : <DeleteOutlined style={{ color: 'black' }} />}
                  </Button>
                </div>
              </div>
              <div className={styles.blockDuration}> 
                {item.duration} min
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
