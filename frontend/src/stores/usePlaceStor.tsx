import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useJwtStore } from "./useJwtStore";
import { Place } from "../types";
import { fetchPlacesRequest } from "../api/place";

interface PlaceState {
  places: Place[] ;
    initPlace: (places: Place[]) => void;
    addPlace: (place: Place) => void;
    clearPlaces: () => void;
}

export const usePlaceStore = create<PlaceState>()(
  persist(
    (set) => ({
      places: [],
      initPlace: (places) => {
    
          set({
            places: places.map((item: Place) => ({
              placeId: item.placeId,
              name: item.name,
            })),
          });
      
      },

       addPlace: (newPlace: Place) => {
        set((state) => ({
          places: state.places ? [...state.places, newPlace] : [newPlace],
        }));
      },

      clearPlaces: () => set({ places:[] }),

     
    }),
    { name: "place-storage" }
  )
);