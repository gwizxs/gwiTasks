import React from 'react';
import { observer } from 'mobx-react-lite';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography } from '@material-ui/core';
import Task from './Task';



interface ColumnProps {
    section: {
      task: typeof Task;
    };
  }


const Column= ({ section }: ColumnProps) => {
    const getItemStyle = (draggableStyle: React.CSSProperties): React.CSSProperties => ({
      padding: 8,
      marginBottom: 8,
      ...draggableStyle
    });
  
    return (
      <div>
        {section?.tasks?.map((task) => {
          return (
            <Draggable draggableId={task.id} key={task.id} index={index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <Card style={getItemStyle(provided.draggableProps.style )}>
                    <Task task={task} />
                    <CardContent>
                      <Typography variant="body1" component="p">
                        {task.title}
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