import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useJwtStore } from "./useJwtStore";
import { Place } from "../types";
import { fetchPlacesRequest } from "../api/place";

interface PlaceState {
  places: Place[] | null;
    fetchPlaces: () => Promise<void>;
    addPlace: (place: Place) => void;
    clearPlaces: () => void;
}

export const usePlaceStore = create<PlaceState>()(
  persist(
    (set) => ({
      places: null,
      fetchPlaces: async () => {
        try {
          const jwt = useJwtStore.getState().jwt;
          if (!jwt) throw new Error("No JWT available");

          const data = await fetchPlacesRequest(jwt);
          set({
            places: data.map((item: Place) => ({
              id: item.placeId,
              name: item.name,
            })),
          });
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      },

       addPlace: (newPlace: Place) => {
        set((state) => ({
          places: state.places ? [...state.places, newPlace] : [newPlace],
        }));
      },

      clearPlaces: () => set({ places: null }),

     
    }),
    { name: "place-storage" }
  )
);