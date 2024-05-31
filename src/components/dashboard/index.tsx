import UseStore from "../../hooks/useStore";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import React, { useCallback } from "react";



const getListStyle = (isDraggingOver) => ({
    backgroundColor: isDraggingOver ? 'lightblue' : 'lightgray',
    padding: 8,
    minHeight: 500,
})

const Dashboard = () => {
  const { boards } = UseStore(); 

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return; 

      const { source, destination, draggableId: taskId } = result;

      if (source.droppableId === destination.droppableId) {
        boards.active?.moveTaskInColumn(taskId, source.index, destination.index);
      } 
      else {
        boards.active?.moveTaskBetweenColumns(
          taskId,
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index
        );
      }
    },
    [boards] 
  );

    return (
      <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {boards.active?.sections?.map((section) => (
            <Grid item key={section.id} xs>
              <Paper>
                <Box p={1} display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="5">{section.title}</Typography>
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