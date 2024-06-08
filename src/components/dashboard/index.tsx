/* eslint-disable react-refresh/only-export-components */
import UseStore from "../../hooks/useStore";
import {  Grid, Paper, Typography } from "@material-ui/core";
import {Box, Button} from "@material-ui/core";
import { Droppable, DragDropContext, OnDragEndResponder, DropResult  } from "react-beautiful-dnd";
import Column, {TasksProps} from "./Column";
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from "react";
import NewTask from './NewTask';


interface Section {
  tasks: TasksProps[],
  task: ({ task: TasksProps });
  id: string,
  title: string,
  description: string,
}


const getListStyle = (isDraggingOver: boolean) => ({
    backgroundColor: isDraggingOver ? 'lightblue' : 'lightgray',
    padding: 8,
    minHeight: 500,
})

const Dashboard = () => {
  const { boards } = UseStore(); 
  const [newTaskToSec, setNewTaskSec] = useState<string | boolean | null>(null);

  
  const closeDialog = useCallback(() => {
  setNewTaskSec(null);
  }, [setNewTaskSec])


  const onDragEnd: OnDragEndResponder = useCallback((event: DropResult) => {
    const {source, destination, draggableId: taskId} = event;
    if (destination && boards?.active) { 
       boards.active.moveTask(taskId, source, destination);
     }
  }, [boards]);


    return (
    <Box component="div" p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={3}>
      {boards.active?.sections?.map((section: Section) => {
        return (
        <Grid item key={section.id} xs>
         <Paper>
          <Box component="div" p={1} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">{section?.title}</Typography>
            <Button variant="outlined" color="primary" onClick={() => {
              setNewTaskSec(section?.id)
            }}>
              Add

            </Button>
          </Box>
          <Droppable droppableId={section.id}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                >
                <Column section={section}/>
                {provided.placeholder as React.ReactNode}
              </div>
            )}
          </Droppable>
         </Paper>
        </Grid>
        )
      })}
      </Grid>
      </DragDropContext>
      <NewTask open={!!newTaskToSec} handleClose={closeDialog} activeSection={setNewTaskSec}/>
    </Box>
    );
  }
  

export default observer(Dashboard);