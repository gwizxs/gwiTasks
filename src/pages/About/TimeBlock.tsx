import { useFormContext } from "react-hook-form";
import type { ITimeBlockResponse, TypeTimeBlockFormState } from "../../types/time-block.types";
import { useSortBl } from "./hook/useSortBl";
import { useDelete } from "./hook/useDelete";
import { Button, Spin } from "antd";
import { DeleteOutlined, EditOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import styles from "./TimeBlocking.module.scss";

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
            icon={<VerticalAlignMiddleOutlined />}
            {...attributes}
            {...listeners}
            aria-describedby="time-block"
          ></Button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '10px',
                width: '70%',
                marginTop: '-10px',
                padding: '10px',
                wordWrap: 'break-word',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '40px',
                }}
              >
                <div style={{ marginLeft: '10px' }}>
                  <span style={{ wordWrap: 'break-word', width: '100%' }}>{item.name}</span>
                </div>
                <div style={{ display: 'flex' }}>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
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
                    {isDeletePending ? <Spin /> : <DeleteOutlined />}
                  </Button>
                </div>
              </div>
              <div style={{ backgroundColor: '#e6f7ff', marginTop: '5px', padding: '2px' }}>
                {item.duration} min
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
