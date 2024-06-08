import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, Select, TextField} from "@material-ui/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import UseStore from "../../hooks/useStore";

interface TaskState {
    title: string | undefined;
    description: string | undefined;
    assignee: string | undefined;
  }
  interface NewTaskProps {
    open: boolean;
    handleClose: () => void;
    activeSection: Dispatch<SetStateAction<string | boolean | null>>;
  }


const NewTask = ({open, handleClose = () => { }}: NewTaskProps ) => {
    const [taskState, setTaskState] = useState<TaskState>({
        title: undefined,
        description: undefined,
        assignee: undefined,
    });
    const {users} = UseStore();

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
    return (
      <div>
        <Dialog open={open} onClick={handleClose}>
        <DialogTitle>Create A New Task</DialogTitle>
        <form onSubmit={() => {}}>
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
                  <option value='' disabled>- </option>
                  {users?.list?.map((user) => {
                    return (
                      <option key={user?.id} value={user?.id}>{user?.name}</option>
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
      </div>
    );
  };
  

export default NewTask;