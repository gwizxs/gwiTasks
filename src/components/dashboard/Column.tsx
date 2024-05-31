import React from 'react';
import { observer } from 'mobx-react-lite';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography } from '@material-ui/core';
import Task from './Task';



interface ColumnProps {
  i
    section: {
      task: typeof Task;
    };
  }


const Column= ({ section }: ColumnProps) => {
    const getItemStyle = (draggableStyle: React.CSSProperties): React.CSSProperties => ({
      padding: 8,
      marginBottom: 8,
      ...draggableStyle,
    });
  
    return (
      <div>
        {section?.task?.map((tasks, index) => {
          return (
            <Draggable draggableId={tasks.id} key={tasks.id} index={index}>
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
  };
  

export default observer(Column);