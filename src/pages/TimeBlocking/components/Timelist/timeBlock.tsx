import { useFormContext } from "react-hook-form";
import { useDelete } from "shared/hooks/Time-Blocking/useDelete";
import { ITimeBlockResponse, TypeTimeBlockFormState } from "shared/types/time-block.types";
import { Button } from "antd";
import styles from '../TimeBlock/TimeBlocking.module.scss'

import { useSortBl } from "shared/hooks/Time-Blocking/useSortBl";
import { DeleteOutlined, EditOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";



export function TimeBlock({item}: {item: ITimeBlockResponse}) {
    const { attributes, listeners, setNodeRef, style } = useSortBl(
        item.id
    )

    const { reset } = useFormContext<TypeTimeBlockFormState>()

    const { DeleteTimeBl} = useDelete(item.id)

    return (
<div ref={setNodeRef} style={style}>
  <div className={styles.block} style={{ backgroundColor: item.color || '#e6f7ff', height: `${item.duration}px` }}>
    <div>
      <Button
        type="text"
        {...attributes}
        {...listeners}
        aria-describedby="time-block"
      ><VerticalAlignMiddleOutlined /></Button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', minHeight: '40px' }}>
            <div style={{ marginLeft: '10px' }}>
              {item.name}
            </div>
            <div style={{ display: 'flex' }}>
            <EditOutlined color="#000"
              onClick={() => {
                reset({
                  id: item.id,
                  color: item.color,
                  duration: item.duration,
                  name: item.name,
                  order: item.order,
                });
              }} />
               <DeleteOutlined onClick={() => DeleteTimeBl() } color="#000" />
            </div>
          </div>
          <div style={{ backgroundColor: '#e6f7ff', marginTop: '5px', padding: '2px' }}>{item.duration} min</div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}
