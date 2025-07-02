import { useCountStore } from "./useStore";

export function TestFetch() {
    const {count} = useCountStore();
    return count;
}