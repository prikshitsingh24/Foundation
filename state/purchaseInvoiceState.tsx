import { atom } from "recoil";

export const selectedPurchaseInvoiceState = atom({
    key: 'selectedPurchaseInvoiceState',
    default: new Set([]),
});

export const selectedPurchaseInvoice = atom({
    key: 'selectedPurchaseInvoice',
    default: "",
})