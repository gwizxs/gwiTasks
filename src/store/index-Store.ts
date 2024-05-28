import { types } from "mobx-state-tree";
import UsersStore from "./users-Store";
import BoardStore from "./board-Store";


const RootStore = types.model('RootStore', {
    users: UsersStore,
    boards: BoardStore,
});

export default RootStore;

