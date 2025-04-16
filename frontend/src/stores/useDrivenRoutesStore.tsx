import { create } from "zustand";
import { DrivenRoute, Route } from "../types";
import { persist } from "zustand/middleware";
import { DatesRangeValue } from "@mantine/dates";
import { useJwtStore } from "./useJwtStore";
import {
  createDrivenRoutesRequest,
  deletDrivenRoutesRequest,
  fetchDrivenRoutesByDatesRequest,
  fetchDrivenRoutesByMonthRequest,
} from "../api/drivenRoute";

interface DrivenRouteState {
  drivenRoutes: DrivenRoute[];
  initDrivenRoutes: (dRoutes: DrivenRoute[]) => void;
  addDrivenRoute: (drivenRoute: DrivenRoute) => void;
  removeDrivenRoutes: (deletDrivenRoutes: DrivenRoute[]) => void;
  fetchDrivenRoutsByMonth: (date: Date) => Promise<any>;
  clearDrivenRoutes: () => void;
}

export const useDriveRouteStore = create<DrivenRouteState>()(
  persist(
    (set, get) => ({
      drivenRoutes: [],

      initDrivenRoutes: async (dRoutes: DrivenRoute[]) => {
        set({
          drivenRoutes: dRoutes.map((item: DrivenRoute) => ({
            drivenRouteId: item.drivenRouteId,
            date: new Date(item.date),
            routeId: item.routeId,
          })),
        });
      },
      addDrivenRoute: (drivenRoute: DrivenRoute) => {
        set((state) => ({
          drivenRoutes: [...state.drivenRoutes, drivenRoute],
        }));
      },

     removeDrivenRoutes: async (deletDrivenRoutes: DrivenRoute[]) => {
        set((state) => {
          if (!state.drivenRoutes) return state;

          // Erstelle ein neues Array mit gefilterten Einträgen
          const updatedRoutes = state.drivenRoutes.filter(
            (route) =>
              !deletDrivenRoutes.some(
                (dRoute) => dRoute.drivenRouteId === route.drivenRouteId
              )
          );

          return { drivenRoutes: updatedRoutes };
        });
      },

      fetchDrivenRoutsByMonth: async (date: Date) => {
        try {
          const jwt = useJwtStore.getState().jwt;
          if (!jwt) throw new Error("No JWT available");

          const data = await fetchDrivenRoutesByMonthRequest(jwt, date);

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

     clearDrivenRoutes: () =>
        set({
          drivenRoutes: [],
        }),
    }),
    { name: "drivenroute-storage" }
  )
);
