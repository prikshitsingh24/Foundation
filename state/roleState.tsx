import { atom } from "recoil";

export const selectedRolesState = atom({
    key: 'selectedRolesState',
    default: new Set([]),
});

export const selectedRole = atom({
    key: 'selectedRole',
    default: "",
})