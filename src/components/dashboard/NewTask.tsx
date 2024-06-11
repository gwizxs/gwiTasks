
import React, { useCallback, useState } from "react";
import UseStore from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Modal, Form, Input, DatePicker, Select, Button } from 'antd';

interface TaskState {
    title: string | undefined;
    description: string | undefined;
    assignee: string | undefined;
    date: null;
  }
  interface NewTaskProps {
    open: boolean;
    handleClose?: () => void;
    onClick: () => void;
    activeSection: string | null;
  }

  const { RangePicker } = DatePicker;
  const { TextArea } = Input;

// eslint-disable-next-line react-refresh/only-export-components
const NewTask = ({open, handleClose = () => {}, activeSection}: NewTaskProps ) => {
    const [taskState, setTaskState] = useState<TaskState>({
        title: undefined,
        description: undefined,
        assignee: undefined,
        date: null,
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

    const addNewTask = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
    
      if (activeSection !== null) {
        boards.active?.addTask(activeSection, {
          ...taskState
        });
      }
    
      handleClose();
    
      setTaskState({
        title: undefined,
        description: undefined,
        assignee: undefined,
        date: null
      });
    }, [taskState, boards, activeSection]);
    


    return (
      <Modal open={open} onCancel={handleClose} footer={null}>
        <h1 style={{marginBottom: 40}}>Create A New Task</h1>
      <Form onClick={addNewTask}>

        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please add the title!' }]}>
          <Input 
          name="title" 
          onChange={updateTask} 
          value={taskState.title || ''} />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please add the title!' }]}>
          <Input.TextArea
           name="description"
            onChange={updateTask}
           value={taskState.description || ''} />
        </Form.Item>

        <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please add a data' }]}>
        <RangePicker
        showTime
         style={{marginLeft: 30}}
         value={taskState.date || ''}
         onChange={(dates, dateString) => 
          updateTask(prevTask => ({ ...prevTask, date: dateString }))} 
           />
        </Form.Item>

        <Form.Item label="Assignee" name="assignee" rules={[{required: true, message: 'Please add a person' }]}>
          <Select
            placeholder="Select assignee"
            onChange={updateTask}
            value={taskState.assignee || ''}
          >
               <option value='' disabled>-</option>
                  {users?.list?.map(user => {
                    return (
                      <option key={user.id} value={user.id}>{user?.name}</option>
                    );
                  })}
          </Select>
        </Form.Item>
        <Form.Item >
          <Button onClick={handleClose}>Close</Button>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
  

// eslint-disable-next-line react-refresh/only-export-components
export default observer(NewTask);