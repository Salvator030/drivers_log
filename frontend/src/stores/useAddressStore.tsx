import { persist } from "zustand/middleware";
import { useJwtStore } from "./useJwtStore";
import { create } from "zustand";
import { createAddressRequest, fetchAddressRequest } from "../api/address";
import { Address } from "../types";
import { useEffect } from "react";

interface AddressState {
  addresses: Address[] | null;
  loading: boolean;
  error: string | null;
  fetchAddresses: () => Promise<void>;
  clearAddresses: () => void;
  createAddress: (addressData: Address) => Promise<Address>;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: null,
      loading: false,
      error: null,
      fetchAddresses: async () => {
        set({ loading: true, error: null });
        try {
          const jwt = useJwtStore.getState().jwt;
          if (!jwt) throw new Error("No JWT available");

          const data = await fetchAddressRequest(jwt);
          console.log("Fetched addresses:", data);
          set({
            addresses: data.map((item: any) => ({
              id: item.addressId,
              name: item.name,
              street: item.street,
              existingStreetsId: item.existingStreetsId,
              existingPlzId: item.existingPlzId,
              houseNumber: item.houseNumber,
              plz: item.plz,
              place: item.place,
              info: item.info,
            })),
            loading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },
      
      clearAddresses: () => set({ addresses: null }),

      createAddress: async (addressData) => {
        set({ loading: true, error: null });
        try {
          console.log("Creating address with data:", addressData);
          const jwt = useJwtStore.getState().jwt;
          console.log("JWT:", jwt);
          if (!jwt) throw new Error("Not authenticated");

          const newAddress = await createAddressRequest(jwt, addressData);
          console.log("Created address:", newAddress);
          // Optimistic update
          set((state) => ({
            addresses: [...(state.addresses || []), newAddress],
            loading: false,
          }));
          return newAddress; // Rückgabe für die Verwendung in der Komponente
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Creation failed",
            loading: false,
          });
          throw error; // Für Fehlerbehandlung in der Komponente
        }
      },
    }),
    { name: "address-storage" }
  )
);

