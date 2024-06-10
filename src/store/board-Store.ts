/* eslint-disable @typescript-eslint/no-unused-vars */
import { flow, getParent, types, onSnapshot, cast} from "mobx-state-tree";
import apiCall from '../api';
import  User  from './users-Store'
import {v1 as uuid} from "uuid"; 


interface DroppableSource {
    droppableId: string;
    index: number;
  }

  type Task = {
    id: string,
    title: string,
    description: string,
    assignee?: string
  };
  
export const TaskModel = types.model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    assignee: types.maybe(types.safeReference(User)),
})

const BoardSection = types.model('BoardSection',  {
    id: types.identifier,
    title: types.string,
    tasks: types.array(TaskModel),
}).actions((self) => {
  return {
    load: flow(function* load() {
      const {id: boardID} = (getParent<typeof Board>(self, 2) as { id: string });
      const {id: status} = self;
      const { tasks } = yield apiCall.get(`boards/${boardID}/tasks/${status}`);
      self.tasks = cast(tasks);
      onSnapshot(self, self.save);
    }),
        afterCreate() {
            self.load();
          },
        save: flow(function* load() {
            const {id: boardID} = (getParent<typeof Board>(self, 2) as { id: string });
            const {id: status} = self;
            const tasksJSON = JSON.stringify(self.tasks);
            yield apiCall.put(`boards/${boardID}/tasks/${status}`,  {tasks: tasksJSON} )
        }),
        addTask(taskPayload: Task) {
            self.tasks.push(taskPayload);
        },
    };
});

export const Board = types.model('Board', {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection),
}).actions(self => {
    return {
      moveTask(taskId: string, source: DroppableSource, destination: DroppableSource) {
            const fromSection = self.sections?.find(section => section.id === source.droppableId);
            const toSection = self.sections?.find(section => section.id === destination.droppableId);
          
            if (fromSection && toSection) {
                const taskToMoveIndex = fromSection.tasks.findIndex(task => task.id === taskId);
                if (taskToMoveIndex !== -1) {
                    const [task] = fromSection.tasks.splice(taskToMoveIndex, 1);
                    
                    toSection.tasks.splice(destination.index, 0, task);
                }
            }
        },
        addTask(sectionId: string, taskPayload: Task) {
          const section = self.sections.find(section => section.id === sectionId);
          if (section) {
              section.tasks.push({
                  ...taskPayload,
                  id: uuid(),
              });
          }
      },  
    };
});


const BoardStore = types
.model("BoardsStore", {
   active: types.maybeNull(types.late(() => types.reference(Board))),
    boards: types.optional(types.array(Board), []),
  })
  .views((self) => ({
    get list() {
      return self.boards.map(({ id, title }) => ({ id, title }));
    },
  }))
  .actions((self) => {
    return {
      load: flow(function* () {
        self.boards = yield apiCall.get("boards");
        self.active = cast(self.boards.length > 0 ? self.boards[0].id : 'MAIN'); 
      }),
      afterCreate() {
        self.load();
      },
      selectBoard(id: string | undefined) {
        self.active = id;
      }
    };
  });

export default BoardStore;

