import { atom } from "recoil";

export const countAtom = atom({
    key: 'countAtom',
    default: 0
})

export const currentUser = atom({
    key: 'currentUser',
    default: null,
})

export const userId = atom({
    key: 'userId',
    default: '',
})

export const isLogin = atom({
    key: 'isLogin',
    default: false,
})