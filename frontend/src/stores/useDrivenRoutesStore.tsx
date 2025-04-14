import { create } from "zustand";
import { DrivenRoute, Route } from "../types";
import { persist } from "zustand/middleware";
import { DatesRangeValue } from "@mantine/dates";
import { useJwtStore } from "./useJwtStore";
import {
  createDrivenRoutesRequest,
  fetchDrivenRoutesByDates,
  fetchDrivenRoutesByMonth,
} from "../api/drivenRoute";

interface DrivenRouteState {
  drivenRoutes: DrivenRoute[] | null;
  fetchDrivenRoutsByDate: (datesValue: DatesRangeValue) => Promise<void>;
  createDrivenRoute: (drivenRoute: DrivenRoute) => Promise<any>;
  fetchDrivenRoutsByMonth: (date: Date) => Promise<any>
  clearDrivenRoutes: () => void;
}

export const useDriveRouteStore = create<DrivenRouteState>()(
  persist(
    (set) => ({
      drivenRoutes: null,

      fetchDrivenRoutsByDate: async (datesValue: DatesRangeValue) => {
        try {
          const jwt = useJwtStore.getState().jwt;
          if (!jwt) throw new Error("No JWT available");

          const data = await fetchDrivenRoutesByDates(jwt, datesValue);

          set({
            drivenRoutes: data.map((item: DrivenRoute) => ({
              drivenRouteId: item.drivenRouteId,
              date: new Date(item.date),
              routeId: item.routeId,
            })),
          });
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      },

      fetchDrivenRoutsByMonth: async (date: Date) => {
        try {
          const jwt = useJwtStore.getState().jwt;
          if (!jwt) throw new Error("No JWT available");

          const data = await fetchDrivenRoutesByMonth(jwt, date);

          set({
            drivenRoutes: data.map((item: DrivenRoute) => ({
              drivenRouteId: item.drivenRouteId,
              date: new Date(item.date),
              routeId: item.routeId,
            })),
          });
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      },

      createDrivenRoute: async (drivenRoute: DrivenRoute) => {
        try {
          const jwt = useJwtStore.getState().jwt;
          if (!jwt) throw new Error("No JWT available");

          const data = await createDrivenRoutesRequest(jwt, drivenRoute).then(
            (dRoute) => {
              set((state) => ({
                drivenRoutes: [...(state.drivenRoutes || []), dRoute],
              }));
            }
          );

          return data;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      },

      clearDrivenRoutes: () =>
        set({
          drivenRoutes: null,
        }),
    }),
    { name: "drivenroute-storage" }
  )
);
