import { use } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MainContentState{
    content: string;
    setContent: (content: string) => void;
}

const useMainContentStore = create<MainContentState>()(
    persist(
        (set) => ({
            content: "Kalender",
            setContent: (content: string) => set({ content }),
        }),{
            name: "main-content-storage",}
        )
    );
export { useMainContentStore };
export type { MainContentState };