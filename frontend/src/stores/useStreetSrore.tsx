import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useJwtStore } from "./useJwtStore";
import { Street } from "../types";
import { fetchStreetsRequest } from "../api/street";

interface StreetState {
  streets: Street[] | null;
  fetchStreet: () => Promise<void>;
  clearStreets: () => void;
    addStreet: (street:Street) => void;
}

export const useStreetStore = create<StreetState>()(
    persist((set) => ({
        streets: null,
        fetchStreet: async () => {
           
            try {
                const jwt = useJwtStore.getState().jwt;
                if (!jwt) throw new Error("No JWT available");

                const data = await fetchStreetsRequest(jwt);
                set({
                    streets: data.map((item: Street) => ({
                        id: item.streetId,
                        street: item.name,
                    
                    })),
                   
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        },
        clearStreets: () => set({ streets: null }),
        
        addStreet:  (newStreet:Street) => {
           
            
              set((state) => ({
                    streets: state.streets ? [...state.streets, newStreet] : [newStreet],
                 
                }));
           
        },
    }),
    { name: "street-storage" }
    )
)
