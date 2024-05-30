
import {  observer } from "mobx-react-lite";
import UseStore from "../../hooks/useStore";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import {  Droppable, DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useCallback } from "react";

const getListStyle = (is) => {
  return {
    backgroundColor: isDraddingOver ? 'lightblue' : 'lightgray',
    padding: 8,
    minHeight: 500,
  }
}

const Dashboard = () => {
    const { boards } = UseStore();
    const onDragEnd = useCallback(() => {
      const {source, destination, draggableId: taskID} = event;
      boards.active.moveTask(taskId, source, destination)
    }, [boards ])
    return (
      <Box>
        <DragDropContext onDragEnd={() => {}}>
          <Grid container spacing={3}>
            {boards.active?.sections?.map((section) => (
              <Grid item key={section.id} xs>
                <Paper>
                  <Box p={1} display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="5">{section?.title}</Typography>
                  </Box>
                  <Droppable droppableId={section.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <Column section={section} />
                        {provided.placeholder} 
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Box>
    );
  };
  

export default observer(Dashboard);