import { count } from "console";
import { create } from "zustand";

interface I_CountStore {
    count: number;
    addCount: (prev: number) => void;
    resetCount: () => void; 
};

export const useCountStore = create<I_CountStore>((set) => ({
    count: 0,
    addCount: () => set((prev) => ({count: prev.count + 1})),
    resetCount: () => set(() => ({count: 0}))
}));