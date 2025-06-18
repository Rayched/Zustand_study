import { create } from "zustand";

interface I_useStore {
    count: number;
    setCount: (prev: number) => void;
};

export const useCounterStore = create<I_useStore>((set) => ({
    count: 0,
    setCount: () => set((prev) => ({count: prev.count + 1}))
}));
/**
 * create => store를 생성하는 함수
 *  - store: zustand에서 전역 상태를 가리키는 말이라고 생각하자.
 *  - set: 상태를 update할 때 사용하는 함수
 */