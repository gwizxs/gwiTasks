import { types, flow, cast } from "mobx-state-tree";
import { axiosWithAuth } from "shared/api/interceptors";

const TaskModel = types.model("Task", {
  id: types.identifier,
  title: types.string,
  description: types.string,
  assignee: types.string,
  date: types.Date,
});

const TaskStore = types.model("TaskStore", {
  tasks: types.array(TaskModel),
})
.actions(self => ({
  loadTasks: flow(function* () {
    try {
      const response = yield axiosWithAuth.get("/user/tasks");
      self.tasks = cast(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  }),
  addTask: flow(function* (taskData) {
    try {
      const response = yield axiosWithAuth.post("/user/tasks", taskData);
      self.tasks.push(response.data);
    } catch (error) {
      console.error("Failed to add task", error);
    }
  }),
  updateTask: flow(function* (taskId, taskData) {
    try {
      yield axiosWithAuth.put(`/user/tasks/${taskId}`, taskData);
      const index = self.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        self.tasks[index] = cast({ ...self.tasks[index], ...taskData });
      }
    } catch (error) {
      console.error("Failed to update task", error);
    }
  }),
  deleteTask: flow(function* (taskId) {
    try {
      yield axiosWithAuth.delete(`/user/tasks/${taskId}`);
      self.tasks.replace(self.tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  }),
}));

export default TaskStore;
