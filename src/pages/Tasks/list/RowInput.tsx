/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { Dispatch, SetStateAction, useEffect } from "react"
import type { ITaskResponse } from "../../../types/task.types"
import { observer } from "mobx-react-lite"


interface IRowIput {
    filterDate?: string
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function RowInput({ setItems, filterDate}: IRowIput) {
    const addRow = () => {
        setItems(prev => {
          const newTask: ITaskResponse = {
            id: '',
            name: '',
            isCompleted: false,
            createdAt: filterDate,
          };
      
          if (!prev) {
            return [newTask];
          }
      
          return [...prev, newTask];
        });
      };
      
      useEffect(() => {
        addRow();
      }, [addRow]);

    return (
        <div>
        </div>
    )
} 

export default observer(RowInput);