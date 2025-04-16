import { JSX, useEffect, useState } from "react";
import { useRouteStore } from "../stores/useRouteStore";
import { useAddressStore } from "../stores/useAddressStore";
import { RoutesTableRow } from "../components/DriversLog/MainView/Calendar/RotesTable/RoutesTableRow";
import { DatesRangeValue } from "@mantine/dates";
import { DrivenRoute, FullValueRoute } from "../types";
import { useApi } from "./useApi";
import { useNewRouteModalStore } from "../stores/useNewRouteModalStore";




export const useRoute = () => {
  // const [tableBody, setTableBody] = useState<JSX.Element[]>([]);
  const [selectedRoutesIds] = useState<Set<number>>(new Set<number>());
  const [tableBody, setTableBody] = useState<JSX.Element[]>([]) ;
  const changeSelectedRoutes = (id: number) => {
    selectedRoutesIds.has(id)
      ? selectedRoutesIds.delete(id)
      : selectedRoutesIds.add(id);
  };
  const routes = useRouteStore((state) => state.routes);
  const addresses = useAddressStore((state) => state.addresses);
const setIsOpen = useNewRouteModalStore(state => state.setIsOpen)
  const {handleNewDrivenRoute} = useApi();

  const handelNewRoteBtn = () => {
    setIsOpen(true);
  }

  const handleSaveRoutesBtn = (dates: DatesRangeValue | undefined) => {
    // Daten auslesen
    const dateList: Date[] = [];
    if (dates) {
      const startDate: Date | null = dates[0] ? new Date(dates[0]) : null;
      const endDate: Date | null = dates[1] ? new Date(dates[1]) : null;

      if (startDate && endDate) {
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          dateList.push(new Date(currentDate)); // Clone des Datums
          currentDate.setDate(currentDate.getDate() + 1); // Nächster Tag
        }
      }
    }
    console.log("dates: ", dateList);

    // liste der "drivenRoutes" erstellen
    let drivenRoutes: DrivenRoute[] = [];
    console.log("selectedRoutesIds: ", selectedRoutesIds);
    selectedRoutesIds.forEach((id) => {
      console.log("id ",id)
      const route = routes.find((route) => route.routeId === id);
      const tempList: DrivenRoute[] = dateList.map((date) => {
        const droute: DrivenRoute = {
          drivenRouteId: null,
          date: date,
          routeId: route?.routeId,
        };
        return droute;
      });
      console.log("tempList:", tempList)
      drivenRoutes=  drivenRoutes.concat(tempList)

    });

    drivenRoutes.forEach(route => handleNewDrivenRoute(route))
  
  };


  useEffect(() => {  if (routes) {
    console.log("routes: ",routes)
    console.log("addresses: ",addresses)
    const rows = routes.map((route) => {
      console.log("route.routeId: ", route.routeId)
      const startAddress = addresses?.find(
        (address) => address.addressId === route.startAddressId
      );
      console.log("startAddress: ", startAddress)
      const endAddress = addresses?.find(
        (address) => address.addressId === route.endAddressId
      );
      console.log("endAddress: ", endAddress)
      if (!startAddress || !endAddress) return null;
      const fullRoute:FullValueRoute = {routeId: route.routeId,startAddress: startAddress, endAddress:endAddress, distance: route.distance};
      console.log("fullRoute: ", fullRoute)
      return (
        <RoutesTableRow key={`route_${route.routeId}`} route={fullRoute} changeSelectedRoutes={changeSelectedRoutes}/>
      );
    })
    .filter((row): row is JSX.Element => row !== null); // Type Guard
   console.log("rows: ", rows)
    setTableBody(rows);
  }
  }, [addresses, routes]);



  return { changeSelectedRoutes, handleSaveRoutesBtn,handelNewRoteBtn ,tableBody };
};
