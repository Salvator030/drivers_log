
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchPlzRequest } from "../api/plz";
import {  Plz } from "../types";
import { useJwtStore } from "./useJwtStore";

interface PlzState {
    plz: Plz[] | null;

    fetchPlz: () => Promise<void>;
    addPlz: (place: Plz) => void;
    clearPlz: () => void;
}
export const usePlzStore = create<PlzState>()(
  persist(      
    (set) => ({
      plz: null,
      fetchPlz: async () => {
        try {
          const jwt = useJwtStore.getState().jwt;
          if (!jwt) throw new Error("No JWT available");

          const data = await fetchPlzRequest(jwt);
          set({
            plz: data.map((item: Plz) => ({
              id: item.plzId,
              plz: item.name,
            })),
          });
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      },

       addPlz: (newPlz: Plz) => {
        set((state) => ({
          plz: state.plz ? [...state.plz, newPlz] : [newPlz],
        }));
      },

      clearPlz: () => set({ plz: null }),

     }),
    { name: "plz-storage" }
  ))