import { flow, getParent, types, onSnapshot} from "mobx-state-tree";
import apiCall from '../api';
import  User  from './users-Store'

interface DroppableSource {
    droppableId: string;
    index: number;
  }

  
const Task = types.model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    assignee: types.safeReference(User),
})

const BoardSection = types.model('BoardSection', {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task)
}).actions((self) => {
    return {
        load: flow(function* () {
            const {id: boardID} = getParent(self, 2)
            const {id: status} = self;
            const {tasks} = yield apiCall.get(`boards/${boardID}/tasks/${status}`)
            self.tasks = tasks;
            onSnapshot(self, self.save);
        }),
        save: flow(function* () {
            const {id: boardID} = getParent(self, 2)
            const {id: status} = self;
            yield apiCall.put(`boards/${boardID}/tasks/${status}`, {tasks})
        }),
        afterCreate() {
            self.load();
        },
    };
});

const Board = types.model('Board', {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection),
}).actions((self) => {
    return {
        // перемещение внутри столбами
        moveTaskInCol(taskId: string, sourceIndex: number, destinationIndex: number) {
            const sectionIndex = self.sections.findIndex(section => section.tasks.some(task => task.id === taskId));
            if (sectionIndex !== -1) {
                self.sections[sectionIndex].tasks.splice(destinationIndex, 0, self.sections[sectionIndex].tasks.splice(sourceIndex, 1)[0]);
            }
        },
        // перемещение между столбами
        moveTaskBetweenCol(id: string, source: DroppableSource, destination: DroppableSource) { 
            const fromSection = self.sections.find((section) => section.id === source.droppableId);
            const toSection = self.sections.find((section) => section.id === destination.droppableId);

            if (fromSection && toSection) {
                const taskToMoveIndex = fromSection.tasks.findIndex((task) => task.id === id);
                const [task] = fromSection.tasks.splice(taskToMoveIndex, 1);


            toSection.tasks = [
                ...toSection.tasks.slice(0, destination.index),
                task,
                ...toSection.tasks.slice(destination.index),
            ]; 
        } 
    },
  };
});


const BoardStore = types.model('BoardsStore', {
    active: types.safeReference(Board),
    boards: types.optional(types.array(Board), []),
})
.views((self) => ({
  get list() {
    return self.boards.map(({id, title}) => ({id, title}))
  }
}))
.actions( (self) => {
    return {
        load: flow(function* () {
            self.boards = yield apiCall.get('boards');
            if (self.boards.length > 0) {
            self.active = self.boards[0]
            }
        }),
        afterCreate() {
            self.load()
        },
    };
});

export default BoardStore;