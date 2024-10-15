/* eslint-disable react-refresh/only-export-components */
import type { Dispatch, SetStateAction } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { observer } from "mobx-react-lite"
import { filterTasks } from "features/Tasks/filter-tasks"
import styles from '../ui/List.module.scss'
import { RowInput } from "./RowInput"
import List from "./List"
import { Typography } from "antd"
import { FILTERS } from "features/Tasks/columns.data"
import { ITaskResponse } from "shared/types/task.types"



interface IListParent {
    value: string
    label: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const { Title } = Typography;

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
                            <Title level={4}>{label}</Title>
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