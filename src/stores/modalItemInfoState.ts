import { atom } from "recoil";

export const modalItemInfoState = atom<boolean>({
    key: "modalItemInfoState",
    default: false,
});
