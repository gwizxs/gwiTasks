import React from 'react';
import { observer } from 'mobx-react-lite';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';
import { Card, CardContent, Typography } from '@material-ui/core';
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


const Column = observer(({ section }: ColumnProps) => {
  const getItemStyle = (style: DraggableProps): React.CSSProperties => {
    return {
      padding: 8,
      marginBottom: 8,
      ...(style || {}),
    };
  };


    return (
      <div>
        if (Array.isArray(section?.task)) {
  section.task.map((tasks: TasksProps, index: number) => {
          return (
            <Draggable draggableId={tasks.id} index={index} key={tasks.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <Card style={getItemStyle(provided.draggableProps.style )}>
                    <Task task={tasks} />
                    <CardContent>
                      <Typography variant="body1" component="p">
                        {tasks.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              )}
            </Draggable>
          );
        })}
      </div>
    );
  });
  

export default Column;