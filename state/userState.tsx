import { atom } from "recoil";

export const isAddUserState = atom({
    key: 'isAddUserState',
    default: false, 
});

export const isEditUserState = atom({
    key: 'isEditUserState',
    default: false, 
});

export const userIdState = atom({
    key: 'userIdState',
    default: '',
});

export const selectedIdsState = atom({
    key: 'selectedIdsState',
    default: new Set([]),
});