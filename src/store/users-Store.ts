import { types, flow, cast } from "mobx-state-tree";
import { axiosWithAuth } from "../api/interceptors";

const Statistics = types.model("Statistics", {
    label: types.string,
    value: types.string,
});

const UserProfile = types.model("UserProfile", {
    user: types.model({
        id: types.identifier,
        createdAt: types.string,
        name: types.string,
        email: types.string,
        avatar: types.string,
    }),
    statistics: types.array(Statistics),
});

const ProfileStore = types.model("ProfileStore", {
    profile: types.maybe(UserProfile),
})
.actions(self => ({
    loadProfile: flow(function* () {
        try {
            const response = yield axiosWithAuth.get('/user/profile');
            self.profile = cast(response.data);
        } catch (error) {
            console.error("Failed to load profile", error);
        }
    }),
    updateProfile: flow(function* (data) {
        try {
            const response = yield axiosWithAuth.put('/user/profile', data);
            self.profile = cast(response.data);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    }),
    afterCreate() {
        this.loadProfile();
    }
}));

const profileStore = ProfileStore.create({});

export default profileStore;
