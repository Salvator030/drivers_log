import { useState } from "react";
import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'


interface JwtState {
    jwt: string | null;
    setJwt: (token: string ) => void;
}

   const useJwtStore = create<JwtState>() (


        persist(
            (set) => ({
                jwt: null,
                setJwt: (token:string) => set({ jwt: token }),
            }),
            {
                name: "jwt-storage", // Name of the item in the storage (must be unique)
                
            },
        )
   )

export { useJwtStore };
export type { JwtState };
