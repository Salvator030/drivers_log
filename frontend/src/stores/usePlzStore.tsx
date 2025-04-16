
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchPlzRequest } from "../api/plz";
import {  Plz } from "../types";
import { useJwtStore } from "./useJwtStore";

interface PlzState {
    plz: Plz[] ;

    initPlz: (plzs: Plz[]) => void;
    addPlz: (place: Plz) => void;
    clearPlz: () => void;
}
export const usePlzStore = create<PlzState>()(
  persist(      
    (set) => ({
      plz: [],
      initPlz: async (data ) => {
   
          set({
            plz: data.map((item: Plz) => ({
              plzId: item.plzId,
              name: item.name,
            })),
        
      });},

       addPlz: (newPlz: Plz) => {
        set((state) => ({
          plz: state.plz ? [...state.plz, newPlz] : [newPlz],
        }));
      },

      clearPlz: () => set({ plz: [] }),

     }),
    { name: "plz-storage" }
  ))