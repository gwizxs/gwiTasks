/* eslint-disable react-refresh/only-export-components */
import type { Dispatch, SetStateAction } from "react"
import type { ITaskResponse } from "../../../types/task.types"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { FILTERS } from "./columns.data"
import { observer } from "mobx-react-lite"
import { filterTasks } from "./filter-tasks"
import styles from './List.module.scss'
import { RowInput } from "./RowInput"
import List from "./List"




interface IListParent {
    value: string
    label: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}


function ListParent({
    value,
    items,
    label,
    setItems
}: IListParent) {
    return (
        <Droppable droppableId={value}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        <div className={styles.colHeading}>
                            <div>{label}</div>
                        </div>
                        {filterTasks(items, value)?.map((item, index) => (
                            <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                            >
                                {(provided) => (
                                 <div
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps} 
                               >
                                        <List
                                        key={item.id}
                                        item={item}
                                        setItems={setItems}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}

                        {value !== 'completed' && !items?.some(item => !item.id) && (
                            <RowInput
                            setItems={setItems}
                            filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
                            />
                        )}
                </div>
            )}
        </Droppable>
    )
}

export default observer(ListParent);