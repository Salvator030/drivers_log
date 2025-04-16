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
import { DrivenRoutes } from "../components/DriversLog/MainView/Calendar/DrivenRoutes/DrivenRoutes";
import { createAddressRequest, fetchAddressRequest } from "../api/address";
import { LogingProps, loginRequest, registRequest } from "../api/auth";
import { fetchStreetsRequest } from "../api/street";
import { fetchPlzRequest } from "../api/plz";
import { fetchPlacesRequest } from "../api/place";
import { createRouteRequest, fetchRoutesRequest } from "../api/route";
import {
  createDrivenRoutesRequest,
  deletDrivenRoutesRequest,
  fetchDrivenRoutesByMonthRequest,
} from "../api/drivenRoute";

export const useApi = () => {
  const { jwt, setJwt } = useJwtStore(
    useShallow((state) => ({ jwt: state.jwt, setJwt: state.setJwt }))
  );

  const { initAddresses, addAdress } = useAddressStore(
    useShallow((state) => ({
      initAddresses: state.initAddresses,
      addAdress: state.addAdress,
    }))
  );

  const { initStreets, addStreet } = useStreetStore(
    useShallow((state) => ({
      initStreets: state.initStreets,
      addStreet: state.addStreet,
    }))
  );

  const { initPlace, addPlace } = usePlaceStore(
    useShallow((state) => ({
      initPlace: state.initPlace,
      addPlace: state.addPlace,
    }))
  );

  const { initPlz, addPlz } = usePlzStore(
    useShallow((state) => ({
      initPlz: state.initPlz,
      addPlz: state.addPlz,
    }))
  );

  const { initRoute, addRoute } = useRouteStore(
    useShallow((state) => ({
      initRoute: state.initRoute,
      addRoute: state.addRoute,
    }))
  );

  const {
    initDrivenRoutes,
    addDrivenRoute,
    removeDrivenRoutes,
    fetchDrivenRoutsByMonth,
  } = useDriveRouteStore(
    useShallow((state) => ({
      fetchDrivenRoutsByMonth: state.fetchDrivenRoutsByMonth,
      initDrivenRoutes: state.initDrivenRoutes,
      addDrivenRoute: state.addDrivenRoute,
      removeDrivenRoutes: state.removeDrivenRoutes,
    }))
  );

  const handleFetchAddresses = async (currentJwt: string) => {
    const data = await fetchAddressRequest(currentJwt);
    console.log("Fetched addresses:", data); // Debugging line
    initAddresses(data);
  };

  const handleFetchStreets = async (currentJwt: string) => {
    const data = await fetchStreetsRequest(currentJwt);
    initStreets(data);
  };

  const handleFetchPlz = async (currentJwt: string) => {
    const data = await fetchPlzRequest(currentJwt);
    initPlz(data);
  };

  const handleFetchPlaces = async (currentJwt: string) => {
    const data = await fetchPlacesRequest(currentJwt);
    initPlace(data);
  };

  const handleFetchRoutes = async (currentJwt: string) => {
    const data = await fetchRoutesRequest(currentJwt);
    initRoute(data);
  };

  const handleFetchDrivenRoutes = async (currentJwt: string) => {
    const data = await fetchDrivenRoutesByMonthRequest(
      currentJwt,
      new Date(Date.now())
    );
    initDrivenRoutes(data);
  };

  const fetchAllData = async () => {
    const currentJwt = useJwtStore.getState().jwt;
    if (!currentJwt) throw new Error("JWT ist nicht gesetzt");
    console.log("currentJwt: ", currentJwt);
    handleFetchAddresses(currentJwt);
    handleFetchStreets(currentJwt);
    handleFetchPlz(currentJwt);
    handleFetchPlaces(currentJwt);
    handleFetchRoutes(currentJwt);
    handleFetchDrivenRoutes(currentJwt);
  };

  const handleLogin = async (values: LogingProps) => {
    try {
      const response = await loginRequest(values);
      setJwt(response);
      fetchAllData();
    } catch (error) {
      console.error("Login fehlgeschlagen:", error);
    }
  };

  const handleRegist = async (values: LogingProps) => {
    try {
      await registRequest(values);
    } catch (error) {
      console.error("Registration fehlgeschlagen:", error);
    }
  };

  const handleNewAddress = async (addressData: Address) => {
    try {
      const address: Address = await createAddressRequest(jwt!, addressData);
      addAdress(address);
      addStreet({ streetId: address.existingStreetsId, name: address.street });
      addPlace({ placeId: address.existingPlaceId, name: address.place });
      addPlz({ plzId: address.existingPlzId, name: address.plz });
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  const handleNewRoute = async (routeData: Route) => {
    try {
      if (!jwt) throw new Error("Not authenticated");
      const newRoute = await createRouteRequest(jwt, routeData);
      addRoute(newRoute);
    } catch (error) {
      console.error(error);
      throw error; // Für Fehlerbehandlung in der Komponente
    }
  };

  const handleNewDrivenRoute = async (dRouteData: DrivenRoute) => {
    const newDrivenRoute = await createDrivenRoutesRequest(jwt!, dRouteData);
    addDrivenRoute(newDrivenRoute);
  };

  const handleDeleteDrivenRoute = async (deletDrivenRoutes: DrivenRoute[]) => {
    try {
      if (!jwt) throw new Error("No JWT available");
      deletDrivenRoutesRequest(jwt, deletDrivenRoutes);
      removeDrivenRoutes(deletDrivenRoutes);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return {
    handleLogin,
    handleRegist,
    handleNewAddress,
    handleNewRoute,
    fetchAllData,
    handleNewDrivenRoute,
    handleDeleteDrivenRoute,
  };
};
