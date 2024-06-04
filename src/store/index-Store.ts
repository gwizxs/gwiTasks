import { types } from "mobx-state-tree";
import UsersStore from "./users-Store";
import BoardStore from "./board-Store";


const RootStore = types.model('RootStore', {
    users: types.optional(UsersStore, {}),
    boards: types.optional(BoardStore, {}),
});

export const store = RootStore.create({
    users: {}, 
    boards: {}, 
  });

export default RootStore;

