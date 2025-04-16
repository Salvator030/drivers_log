import { persist } from "zustand/middleware";
import { create } from "zustand";
import { Address } from "../types";

interface AddressState {
  addresses: Address[];

  initAddresses: (data: Address[]) => void;
  clearAddresses: () => void;
  addAdress: (addressData: Address) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      loading: false,
      error: null,
      initAddresses: (data: Address[]) => {
        console.log("initAddresses", data);
        set({
          addresses: [
            ...data.map((item: Address) => ({
              addressId: item.addressId,
              name: item.name,
              street: item.street,
              existingStreetsId: item.existingStreetsId,
              existingPlzId: item.existingPlzId,
              existingPlaceId: item.existingPlaceId,
              houseNumber: item.houseNumber,
              plz: item.plz,
              place: item.place,
              info: item.info,
            })),
          ],
        });
      },

      clearAddresses: () => set({ addresses: [] }),

      addAdress: (addressData) => {
        set((state) => ({
          addresses: [...(state.addresses || []), addressData],
        }));
      },
    }),
    { name: "address-storage" }
  )
);
