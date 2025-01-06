import { atom } from "recoil";

export const selectedItemIdsState = atom({
    key: 'selectedItemIdsState',
    default: new Set([]),
});