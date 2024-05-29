import {  observer } from "mobx-react-lite";
import UseStore from "../../hooks/useStore";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import {  Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

const Dashboard = () => {
    const { boards } = UseStore();
    return (
      <Box>
        <DragDropContext onDragEnd={() => {}}>
          <Grid container>
            {boards.active?.sections.map((section) => (
              <Grid item key={section.id}>
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