/* eslint-disable react-refresh/only-export-components */
import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks } from "../hook/useTask";
import { useTaskDnd } from "../hook/useTaskDnd";
import { COLUMNS } from "./columns.data";
import ListParent from './ListParent';
import { observer } from "mobx-react-lite";
import styles from './List.module.scss'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



function ListView() {
  const { items, setItems, isLoading } = useTasks(); 
  
  const { onDragEnd } = useTaskDnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.table}>
        <div>Task name</div>
        <div>Due date</div>
        <div>Priority</div>
        <div>delete task</div>
      </div>

      <div className={styles.parentsWrapper}>
        {isLoading ? (
          <>
            {[...Array(COLUMNS.length)].map((_, index) => (
              <div key={index} className={styles.skeletonContainer}>
                <Skeleton height={70} />
                <Skeleton height={70} />
              </div>
            ))}
          </>
        ) : (
          COLUMNS.map(column => (
            <ListParent
              items={items}
              label={column.label}
              value={column.value}
              setItems={setItems}
              key={column.value}
            />
          ))
        )}
      </div>
    </DragDropContext>
  );
}

export default observer(ListView);
