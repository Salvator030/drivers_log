import { useShallow } from "zustand/shallow";
import { useAddressStore } from "../stores/useAddressStore";
import { useJwtStore } from "../stores/useJwtStore";
import { Address, DrivenRoute, Route } from "../types";
import { useStreetStore } from "../stores/useStreetSrore";
import { usePlaceStore } from "../stores/usePlaceStor";
import { usePlzStore } from "../stores/usePlzStore";
import { useRouteStore } from "../stores/useRouteStore";
import { DatesRangeValue } from "@mantine/dates";
import { useDriveRouteStore } from "../stores/useDrivenRoutesStore";

export const useApi = () => {
  const jwt = useJwtStore((state) => state.jwt);

  const { fetchAddresses, createAddress } = useAddressStore(
    useShallow((state) => ({
      fetchAddresses: state.fetchAddresses,
      createAddress: state.createAddress,
    }))
  );


  const { fetchStreet, addStreet } = useStreetStore(
    useShallow((state) => ({
      fetchStreet: state.fetchStreet,
      addStreet: state.addStreet,
    }))
  );

  const { fetchPlaces, addPlace } = usePlaceStore(
    useShallow((state) => ({
      fetchPlaces: state.fetchPlaces,
      addPlace: state.addPlace,
    }))
  );

  const { fetchPlz, addPlz } = usePlzStore(
    useShallow((state) => ({
      fetchPlz: state.fetchPlz,
      addPlz: state.addPlz,
    }))
  );

  const {fetchRoutes, createRoute} = useRouteStore(
    useShallow((state) => ({
      fetchRoutes: state.fetchRoutes,
      createRoute: state.createRoute
    }))
  )

  const {createDrivenRoute} = useDriveRouteStore(useShallow((state) => ({
    createDrivenRoute: state.createDrivenRoute,
  })))

  const fetchAllData = async () => {
  
    fetchAddresses();
    fetchStreet();
    fetchPlaces();
    fetchPlz();
    fetchRoutes();
  };



  const handleNewAddress = async (addressData: Address) => {
    try {
      const address: Address = await createAddress(addressData);
      addStreet({ streetId: address.existingStreetsId, name: address.street });
      addPlace({ placeId: address.existingPlaceId, name: address.place });
      addPlz({ plzId: address.existingPlzId, name: address.plz });
      console.log("Address created successfully");
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };



  const handleNewRoute = async (routeData: Route) =>{
    await createRoute(routeData);
  }

  const handelGetDrivenRouteBeetwenDates = async (dRoute: DrivenRoute) =>  {
    await createDrivenRoute(dRoute);
    };
  return {
    handleNewAddress,
    handleNewRoute,
    fetchAllData,
  };

}