import { useShallow } from "zustand/shallow";
import { useDriveRouteStore } from "../stores/useDrivenRoutesStore";
import { JSX, useCallback, useEffect, useState } from "react";
import { useRouteStore } from "../stores/useRouteStore";
import { Address, DrivenRoute, FullValueRoute } from "../types";
import { useAddressStore } from "../stores/useAddressStore";
import { RoutesTableRow } from "../components/DriversLog/MainView/Calendar/RotesTable/RoutesTableRow";
import { Table, Title } from "@mantine/core";
import { useDataPickerStore } from "../stores/useDataPickerStore";
import {
  fullValueRoute,
  getAllDates,
  toFullDateString,
} from "../helper/DrivenRouteHookHelper";
import { stat } from "fs";
import { deletDrivenRoutesRequest } from "../api/drivenRoute";
import { DrivenRoutesTableRow } from "../components/DriversLog/MainView/Calendar/RotesTable/DrivenRoutesTableRow";

export const useDrivenRoute = (datesRangeValue: [Date | null, Date | null]) => {
  const routes = useRouteStore((state) => state.routes);
  const { drivenRoutes, deletDrivenRoutes } = useDriveRouteStore(
    useShallow((state) => ({
      drivenRoutes: state.drivenRoutes,
      deletDrivenRoutes: state.deletDrivenRoutes
    }))
  );
  const [tableBody, setTableBody] = useState<JSX.Element[]>([]);
  const addresses = useAddressStore((state) => state.addresses);
  // const datesRangeValue = useDataPickerStore((state) => state.datesRangeValue)

  const [selectedRoutesIds] = useState<Set<number>>(new Set<number>());

  const changeSelectedRoutes = useCallback(
    (id: number) => {
      selectedRoutesIds.has(id)
        ? selectedRoutesIds.delete(id)
        : selectedRoutesIds.add(id);
    },
    [selectedRoutesIds]
  );


  const handleOnClickDeleteDrivenRoutes = (): void =>{
    const selectedRoutes = Array.from(selectedRoutesIds).map((id) =>
      drivenRoutes?.find((route) => route.drivenRouteId === id)
    ).filter((route): route is DrivenRoute => route !== undefined);
    deletDrivenRoutes(selectedRoutes);
  } 

  const getFullValueRoute = useCallback(
    (drivenRoute: DrivenRoute) => {
      return fullValueRoute(routes, drivenRoute, addresses);
    },
    [addresses, routes]
  );

  useEffect(() => {
    if (drivenRoutes) {
      // alle daten
      const allDates = getAllDates(datesRangeValue);

      //  strecken im zeitraum nach datum groupirt
      const groupedRoutesByDate: Map<string, DrivenRoute[]> = new Map();

      drivenRoutes.forEach((route) => {
        const dateKey = toFullDateString(route.date);

        if (!groupedRoutesByDate.has(dateKey)) {
          groupedRoutesByDate.set(dateKey, []);
        }

        groupedRoutesByDate.get(dateKey)?.push(route);
      });

      const rows: JSX.Element[] = [];
      allDates.forEach((date, index) => {
        const titleDate = new Date(date);
        const tile =
          titleDate.getDate() +
          "." +
          (titleDate.getMonth() + 1) +
          "." +
          titleDate.getFullYear();
        rows.push(
          <Table.Tr>
            <Table.Td colSpan={4} ta="center" c="dimmed">
              <Title order={4}>{tile} </Title>
            </Table.Td>
          </Table.Tr>
        );

        const routesByMonth = groupedRoutesByDate.get(toFullDateString(date));
        routesByMonth?.forEach((drivenRoute) =>
          rows.push(
            <DrivenRoutesTableRow
              key={`byMonth_${drivenRoute.drivenRouteId}`}
              route={getFullValueRoute(drivenRoute)!}
              changeSelectedRoutes={changeSelectedRoutes}
              drivenRoueId={drivenRoute.drivenRouteId!}
            />
          )
        );
      });

      setTableBody(rows);
    }
  }, [
    addresses,
    changeSelectedRoutes,
    datesRangeValue,
    drivenRoutes,
    getFullValueRoute,
    routes,
  ]);

  return { tableBody, handleOnClickDeleteDrivenRoutes};
};
