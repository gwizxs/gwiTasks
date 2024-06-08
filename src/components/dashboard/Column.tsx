/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { observer } from 'mobx-react-lite';
import {  DraggingStyle, NotDraggingStyle,  } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { Card} from '@material-ui/core';
import Task from './Task';
import me from "../../api";
import { UserProps } from '../common/User';

interface ColumnProps {
    section: {
      tasks: TasksProps[],
      task: ({ task: TasksProps });
    };
  }
  export interface TasksProps {
    id: string,
    title: string,
    assignee: UserProps,
    description: string,
    me: typeof me,
  }



  function getItemStyle(_isDragging: boolean, draggableStyle: React.CSSProperties | DraggingStyle | NotDraggingStyle | undefined): React.CSSProperties {
    return {
      padding: 8,
      marginBottom: 8,
      ...draggableStyle
    };
  }

const Column = ({ section }: ColumnProps) => {

  return (
    <div>
      {section.tasks.map((task: TasksProps, index: number) => {
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
};
  

export default observer(Column);