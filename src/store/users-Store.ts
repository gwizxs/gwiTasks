import { types, flow } from "mobx-state-tree";
import apiCall from '../api'

 export const User = types.model('User', {
    id: types.identifier,
    createdAt: types.string,
    name: types.string,
    avatar: types.string,
})

const activeUser = User.named('activeUser');


const UsersStore = types.model('UseStore', {
    users: types.maybe(types.array(User)),
    me: types.maybe(activeUser)
})
.views(self => {
    return {
        get list() {
            return self.users?.map(({id, name}) => ({id, name}))
        }
    }
})
.actions(self => {
    return {
        load: flow(function* () {
            self.users = yield apiCall.get('users')
            self.me = yield apiCall.get('me');
        }),
        afterCreate() {
            self.load();
        }
    }
});

export default UsersStore;