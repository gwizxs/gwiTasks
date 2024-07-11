import { types, flow } from "mobx-state-tree";
import { axiosWithAuth } from "../api/interceptors";
import {  TypeUserForm } from "../types/auth.types";

const UserProfile = types.model({
    user: types.model({
        id: types.string,
        createdAt: types.string,
        updatedAt: types.string,
        email: types.string,
        name: types.string,
        workInterval: types.number,
        breakInterval: types.number,
        IntervalsCount: types.number,
        tasks: types.array(types.frozen()) 
    }),
    statistics: types.array(types.model({
        label: types.string,
        value: types.number 
    }))
});

const ProfileStore = types.model("ProfileStore", {
    profile: types.maybe(UserProfile),
    isLoading: types.optional(types.boolean, false),
    isSuccess: types.optional(types.boolean, false)
})
.actions(self => ({
    getProfile: flow(function* () {
        self.isLoading = true;
        self.isSuccess = false;
        try {
            const response = yield axiosWithAuth.get('/user/profile');
            self.profile = response.data;
            self.isLoading = false;
            self.isSuccess = true;
        } catch (error) {
            console.error("Failed to load profile", error);
            self.isLoading = false;
            self.isSuccess = false;
        }
    }),
    update: flow(function* (data: TypeUserForm) {
        self.isLoading = true;
        self.isSuccess = false;
        try {
            const response = yield axiosWithAuth.put('/user/profile', data);
            self.profile = response.data;
            self.isLoading = false;
            self.isSuccess = true;
        } catch (error) {
            console.error("Failed to update profile", error);
            self.isLoading = false;
            self.isSuccess = false;
        }
    }),
    afterCreate() {
        this.getProfile();
    }
}));

export default ProfileStore;
