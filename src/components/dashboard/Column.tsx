import React from 'react';
import { observer } from 'mobx-react-lite';
import { Draggable,  } from 'react-beautiful-dnd';
import { Card} from '@material-ui/core';
import Task from './Task';


interface ColumnProps {
    section: {
      task: typeof Task;
    };
  }
  interface TasksProps {
    id: string,
    title: string,
  }



  function getItemStyle(isDragging, draggableStyle): React.CSSProperties {
    return {
      padding: 8,
      marginBottom: 8,
      ...draggableStyle
    };
  };

const Column = observer(({ section }: ColumnProps) => {

  return (
    <div>
      {section.tasks.map((task, index) => {
        return (
          <Draggable draggableId={task.id} key={task.id} index={index}>
            {(provided, snapshot) => (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <Task task={task}/>
              </Card>
            )}
          </Draggable>
        )
      })}
    </div>
  )
});
  

export default Column;