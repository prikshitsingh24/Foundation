import { atom } from "recoil";

export const selectedMaterialRequestedIdState = atom({
    key: 'selectedMaterialRequestedIdState',
    default: new Set([]),
});