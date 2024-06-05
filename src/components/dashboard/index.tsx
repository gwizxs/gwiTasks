/* eslint-disable react-refresh/only-export-components */
import UseStore from "../../hooks/useStore";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { Droppable, DragDropContext,  } from "react-beautiful-dnd";
import Column, {TasksProps} from "./Column";
import { observer } from 'mobx-react-lite';
import { useCallback } from "react";

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



  const onDragEnd = useCallback((event) => {
    const {source, destination, draggableId: id} = event;
    if (boards.active !== null) {
    boards.active.moveTask(id, source, destination);
    }
  }, [boards]);


    return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={3}>
      {boards.active?.sections?.map((section: Section) => {
        return (
        <Grid item key={section.id} xs>
         <Paper>
          <Box p={1} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">{section?.title}</Typography>
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
    </Box>
    )
  }
  

export default observer(Dashboard);