import { atom } from "recoil";

export const selectedSalesInvoiceState = atom({
    key: 'selectedSalesInvoiceState',
    default: new Set([]),
});

export const selectedSalesInvoice = atom({
    key: 'selectedSalesInvoice',
    default: "",
})