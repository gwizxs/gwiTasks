import { flow, getParent, types, onSnapshot } from "mobx-state-tree";
import { safeReference} from "mobx-state-tree/dist/internal";
import apiCall from '../api';
import User from "../components/common/User";

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
}).actions(self => {
    return {
        load: flow(function* () {
            const {id: boardID} = getParent(self, 2)
            const {id: status} = self;
            const {tasks} = yield apiCall.get(`boards/${boardID}/tasks/${status}`)
            self.tasks = tasks;

            onSnapshot(self, self.save)
        }),
        save: flow(function* ({tasks}) {
            const {id: boardID} = getParent(self, 2)
            const {id: status} = self;
            const result = yield apiCall.put(`boards/${boardID}/tasks/${status}`, {tasks})

        }),
        afterCreate() {
            self.load();
        }
        
    }
})

const Board = types.model('Board', {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection),
}).actions(self => {
    return {
        moveTask(id, source, destination) { 
            const fromSection = self.sections.find(section => section.id === source.droppableId);
            const toSection = self.sections.find(section => section.id === destination.droppableId);

            const taskToMoveIndex = fromSection.tasks.findIndex(task => task.id === id);
            const [task] = fromSection?.tasks?.splice(taskToMoveIndex, 1);

            toSection?.tasks.splice(destination.index, 0, task.toJSON())
        } 
    }
})
const BoardStore = types.model('BoardsStore', {
    active: safeReference(Board),
    boards: types.optional(types.array(Board), []),
})
.views(self => ({
  get list() {
    return self.boards.map(({id, title}) => ({id, title}))
  }
}))
.actions( self => {
    return {
        load: flow(function* () {
            self.boards = yield apiCall.get('boards');
            self.active = 'MAIN';
        }),
        afterCreate() {
            self.load()
        },
    }
})

export default BoardStore;