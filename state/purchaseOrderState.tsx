import { atom } from "recoil";

export const selectedPurchaseOrderIdState = atom({
    key: 'selectedPurchaseOrderIdState',
    default: new Set([]),
});