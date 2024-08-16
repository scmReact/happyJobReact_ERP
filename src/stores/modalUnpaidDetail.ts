import { atom } from "recoil";

export const modalUnpaidDetailState = atom<boolean>({
    key: "modalUnpaidDetailState",
    default: false,
});
