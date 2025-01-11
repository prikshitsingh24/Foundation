import { atom } from "recoil";

export const isAddAccountState = atom({
    key: 'isAddAccountState',
    default: false, 
});

export const isEditAccountState = atom({
    key: 'isEditAccountState',
    default: false, 
});

export const selectedAccountsState = atom({
    key: 'selectedAccountsState',
    default: new Set([]),
});

export const selectedAccount = atom({
    key: 'selectedAccount',
    default: "",
})