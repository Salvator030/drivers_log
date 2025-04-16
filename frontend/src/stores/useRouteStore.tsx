import { create } from "zustand";
import { Route } from "../types";
import { persist } from "zustand/middleware";
import { useJwtStore } from "./useJwtStore";
import { createRouteRequest, fetchRoutesRequest } from "../api/route";

interface RouteState{
    routes: Route[] ;
    initRoute: (routes: Route[]) => void;
    clearRoutes: () => void;
    addRoute: (route: Route) => void;
}

    export const useRouteStore = create<RouteState>()(
    persist((set) => ({
        routes: [],

        initRoute: async (routes) => {  
            set({
                routes: routes.map((item: Route) :Route=> ({
                    routeId: item.routeId,
                    startAddressId: item.startAddressId,
                    endAddressId: item.endAddressId,
                    distance: item.distance
                
                })),
               
            });
       },

        clearRoutes: () => set({ routes: [] }),

      addRoute: async (newRoute: Route) => {
        set((state) => ({
            routes: [...state.routes, newRoute],
            loading: false,
          }));
               
              },


    }),{name: "route-storage"}
));
