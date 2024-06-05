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

  
export const Task = types.model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    assignee: types.safeReference(User),
})

const BoardSection = types.model('BoardSection', {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task),
}).actions(self => {
    return {
        load: flow(function* () {
            const { id: boardID } = getParent(self, 2);
            const { id: status } = self;
            const { tasks } = yield apiCall.get(`boards/${boardID}/tasks/${status}`);
            self.tasks = cast(tasks);
            onSnapshot(self, self.save);
            
        }),
        afterCreate() {
            self.load();
          },
        save: flow(function* ({tasks}: {tasks: typeof Task[]}) {
            const {id: boardID} = getParent(self, 2)
            const {id: status} = self;
            yield apiCall.put(`boards/${boardID}/tasks/${status}`, { tasks })
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
        addTask(sectionId: string, taskPayload: Task) {
            const section = self.sections.find(section => section.id === sectionId);
            if (section) {
                section.tasks.push({
                    ...taskPayload,
                    id: uuid(),
                });
            }
        },  
        moveTask(taskId: string, source:  { droppableId: string }, destination: DroppableSource) {
            const fromSection = self.sections?.find(section => section.id === source.droppableId);
            const toSection = self.sections?.find(section => section.id === destination.droppableId);
          
            if (fromSection && toSection) {
                const taskToMoveIndex = fromSection.tasks.findIndex(task => task.id === taskId);
                if (taskToMoveIndex !== -1) {
                    const [task] = fromSection.tasks.splice(taskToMoveIndex, 1);
                    toSection.tasks.splice(destination.index, 0, task);
                }
            }
        }
    };
});


const BoardStore = types
  .model("BoardsStore", {
    active: types.maybeNull(
      types.array(types.maybe(types.reference(types.late(() => Board))))
    ),
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
        if (self.boards.length > 0) {
          self.active = [self.boards[0]];
        }
      }),
      afterCreate() {
        self.load();
      },
    };
  });

export default BoardStore;