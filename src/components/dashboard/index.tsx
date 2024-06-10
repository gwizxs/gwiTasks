/* eslint-disable react-refresh/only-export-components */
import PlusCircleOutlined from '@ant-design/icons'
import UseStore from "../../hooks/useStore";
import {  Grid, Paper, Typography } from "@material-ui/core";
import {Box} from "@material-ui/core";
import { Droppable, DragDropContext, OnDragEndResponder, DropResult  } from "react-beautiful-dnd";
import Column, {TasksProps} from "./Column";
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from "react";
import NewTask from './NewTask';
import { Button, ConfigProvider, Space } from "antd";
import me from '../../dataBase/index.json'
import { TinyColor } from '@ctrl/tinycolor';

interface Section {
  tasks: TasksProps[],
  id: string,
  title: string,
  description?: string,
  me?: typeof me
}

const colors1 = ['#1677ff', '#e6fffb'];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const getListStyle = (isDraggingOver: boolean) => ({
    backgroundColor: isDraggingOver ? '#e6f4ff' : '#e6f4ff',
    padding: 30,
    minHeight: 250,
})

const Dashboard = () => {
  const { boards } = UseStore(); 
  const [newTaskToSec, setNewTaskSec] = useState<string | null>(null);

  
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
          <Box component="div" p={3} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{section?.title}</Typography>
            {/* antd  */}
            <Space>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
            <Button type="primary" icon={<PlusCircleOutlined/>} onClick={() => {
              setNewTaskSec(section?.id)
            }}>add</Button>
    </ConfigProvider>
  </Space>
   {/* antd  */}
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
      <NewTask open={!!newTaskToSec} handleClose={closeDialog} activeSection={newTaskToSec}/>
    </Box>
    );
  }
  

export default observer(Dashboard);