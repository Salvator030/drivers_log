import { create } from "zustand";
import { Route } from "../types";
import { persist } from "zustand/middleware";
import { useJwtStore } from "./useJwtStore";
import { createRouteRequest, fetchRoutesRequest } from "../api/route";

interface RouteState{
    routes: Route[] ;
    fetchRoutes: () => Promise<void>;
    clearRoutes: () => void;
    createRoute: (route: Route) => Promise<Route>;
}

    export const useRouteStore = create<RouteState>()(
    persist((set) => ({
        routes: [],

        fetchRoutes: async () => {   try {
            const jwt = useJwtStore.getState().jwt;
            if (!jwt) throw new Error("No JWT available");

            const data = await fetchRoutesRequest(jwt);
            console.log('Fetchet Routes: ', data)
            set({
                routes: data.map((item: Route) :Route=> ({
                    routeId: item.routeId,
                    startAddressId: item.startAddressId,
                    endAddressId: item.endAddressId,
                    distance: item.distance
                
                })),
               
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }},

        clearRoutes: () => set({ routes: [] }),

        createRoute: async (routeData: Route): Promise<Route> => {
          
                try {
                  console.log("Creating address with data:", routeData);
                  const jwt = useJwtStore.getState().jwt;
                  console.log("JWT:", jwt);
                  if (!jwt) throw new Error("Not authenticated");
        
                  const newRoute = await createRouteRequest(jwt, routeData);
                  console.log("Created address:", newRoute);
                  // Optimistic update
                  set((state) => ({
                    routes: [...(state.routes || []), newRoute],
                    loading: false,
                  }));
                  return newRoute; // Rückgabe für die Verwendung in der Komponente
                } catch (error) {
                    console.error(error)
                  throw error; // Für Fehlerbehandlung in der Komponente
                }
              },


    }),{name: "route-storage"}
));
