import { Route } from "../types";

const routePrefix: string = "http://localhost:8080/api/route/";

export const fetchRoutesRequest = async (jwt: string) => {
    const response = await fetch( `${routePrefix}getAll`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    console.log("Response:", response);
    return response.json(); // Korrektur: json() muss aufgerufen werden
  }

  export const createRouteRequest = async (
    jwt: string, 
    routeData: Omit<Route, 'id'>
  ) => {
    console.log("Creating route with data:", routeData);
    const response = await fetch(  `${routePrefix}create` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
     
      body: JSON.stringify(routeData),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create address");
    }
    console.log("Response:", response);
    return response.json();
  };