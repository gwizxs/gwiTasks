
import { Dispatch, SetStateAction,  } from "react"
import styles from './List.module.scss'
import { Button } from "antd"
import type { ITaskResponse } from "shared/types/task.types"


interface IRowInput {
    filterDate?: string,
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function RowInput({ setItems, filterDate}: IRowInput) {
    const addRow = () => {
        setItems(prev => {
          if (!prev) return 


          return [
            ...prev,
          {
            id: '',
            name: '',
            isCompleted: false,
            createdAt: filterDate,
          }
        ]
        })
      }


      


    return (
        <div className={styles.addRow}>
          <Button
          onClick={addRow}
          className={styles.BtnRow}
          >
            add task...
          </Button>
        </div>
    )
} 
