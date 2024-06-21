/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { Dispatch, SetStateAction, useEffect } from "react"
import type { ITaskResponse } from "../../../types/task.types"
import { observer } from "mobx-react-lite"
import styles from './List.module.scss'


interface IRowIput {
    filterDate?: string
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function RowInput({ setItems, filterDate}: IRowIput) {
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
      
      useEffect(() => {
        addRow();
      }, [addRow]);

    return (
        <div className={styles.addRow}>
          <button
          onClick={addRow}
          className={styles.BtnRow}
          >
            add task...
          </button>
        </div>
    )
} 

export default observer(RowInput);