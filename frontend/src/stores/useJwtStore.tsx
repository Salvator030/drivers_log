// useJwtStore.tsx
import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

interface JwtState {
  jwt: string | null;
  setJwt: (token: string) => void;
  clearJwt: () => void;
}

const useJwtStore = create<JwtState>()(
  devtools(
    persist(
      (set) => ({
        jwt: null,
        setJwt: (token: string) => set({ jwt: token }),
        clearJwt: () => set({ jwt: null })
      }),
      { name: "jwt-storage" }
    )
  )
);

export { useJwtStore };