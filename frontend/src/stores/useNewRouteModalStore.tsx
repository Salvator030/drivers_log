import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useJwtStore } from "./useJwtStore";
import { Address, Route } from "../types";
import { start } from "repl";
import { useField, UseFieldReturnType } from "@mantine/form";

interface NewRoutesModalState {
  isOpen: boolean;
  startAdress: Address | null;
  endAdress: Address | null;
  distance: number | null;
  setIsOpen: (isOpen: boolean) => void;
  setStartAdress: (startAdress: Address | null) => void;
  setEndAdress: (endAdress: Address | null) => void;
  setDistance: (distance: number | null) => void;
  close: () => void;
  setAddress: (address: Address) => void;

  back: () => void;
}

const useNewRouteModalStore = create<NewRoutesModalState>()(
  persist(
    (set,get) => ({
      isOpen: false,
      setIsOpen: (isOpen: boolean) => set({ isOpen }),

      startAdress: null,
      setStartAdress: (startAdress: Address | null) => set({ startAdress }),

      endAdress: null,
      setEndAdress: (endAdress: Address | null) => set({ endAdress }),

      distance: null,
      setDistance: (distance: number | null) => set({ distance }),

    

      close: () => {
        set({ isOpen: false, startAdress: null, endAdress: null, distance: null });
      },

      setAddress: (address: Address) => {
        const currentState = get();
        
        if (currentState.startAdress === null && currentState.endAdress === null) {
          set({ startAdress: address });
        } else if (currentState.endAdress === null && currentState.startAdress !== address) {
          set({ endAdress: address });
        }
        // Wenn beide gesetzt sind: keine Aktion
      },

      

      
      back: ()=> {
        const currentState = get();
        if(currentState.distance){
          set({distance: null,
          })
        }
        else if(currentState.endAdress){
          set({endAdress: null})
        }
        else{
          set({startAdress: null})
        }
      },
    }),
    {
      name: "new-address-Modal-storage",
    }
  )
);

export { useNewRouteModalStore };
