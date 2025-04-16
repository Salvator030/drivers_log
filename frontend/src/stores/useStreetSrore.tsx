import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Street } from "../types";

interface StreetState {
  streets: Street[];
  clearStreets: () => void;
  addStreet: (street: Street) => void;
  initStreets: (streets: Street[]) => void;
}

export const useStreetStore = create<StreetState>()(
  persist(
    (set) => ({
      streets: [],

      clearStreets: () => set({ streets: [] }),

      addStreet: (newStreet: Street) => {
        set((state) => ({
          streets: state.streets ? [...state.streets, newStreet] : [newStreet],
        }));
      },
      initStreets: (streets: Street[]) => {
        set({
          streets: streets.map((item: Street) => ({
            streetId: item.streetId,
            name: item.name,
          })),
        });
      },
    }),
    { name: "street-storage" }
  )
);
