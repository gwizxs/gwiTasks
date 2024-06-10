import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, Select, TextField} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import UseStore from "../../hooks/useStore";
import { observer } from "mobx-react-lite";

interface TaskState {
    title: string | undefined;
    description: string | undefined;
    assignee: string | undefined;
  }
  interface NewTaskProps {
    open: boolean;
    handleClose?: () => void;
    onClick: () => void;
    activeSection: string | null;
  }


const NewTask = ({open, handleClose = () => {}, activeSection}: NewTaskProps ) => {
    const [taskState, setTaskState] = useState<TaskState>({
        title: undefined,
        description: undefined,
        assignee: undefined,
    });
    const {users, boards} = UseStore();

    function updateTask(event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>): void {
      const { name, value } = event.target;

      if (typeof name === 'string') {
        setTaskState((prevTask) => ({
          ...prevTask,
          [name]: value ? (value as string).trim() : ''
        }));
      } else {
        console.error("Invalid name property:", name);
      }
    }

    const addNewTask = useCallback((event) => {
       event.preventDefault();

       boards.active?.addTask(activeSection, taskState);
       handleClose();
       setTaskState({})
    }, [taskState, boards, activeSection])


    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create A New Task</DialogTitle>
        <form onSubmit={addNewTask}>
          <DialogContent style={{ minWidth: 500 }}>
          <Box component="div" p={1}>
               <TextField
                 fullWidth
                 required
                 type="text"
                 name="title"
                 label="Title"
                 onChange={updateTask}
                 value={taskState.title}
               />
             </Box>
            <Box component="div" p={1}>
              <TextField
                fullWidth
                required
                type="text"
                name="description"
                label="Description"
                onChange={updateTask}
                value={taskState.description || ''}
              />
            </Box>
            <Box component="div" p={1}>
              <FormControl fullWidth>
                <FormLabel shrink={true}>Assignee</FormLabel>
                <Select
                  native
                  name="assignee"
                  value={taskState.assignee || ''}
                  onChange={updateTask}
                >
                  <option value='' disabled>-</option>
                  {users?.list?.map(user => {
                    return (
                      <option key={user.id} value={user.id}>{user?.name}</option>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} color="secondary">
              close
            </Button>
            <Button type="submit" color="secondary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  

// eslint-disable-next-line react-refresh/only-export-components
export default observer(NewTask);