import { DatesRangeValue } from "@mantine/dates";
import { DrivenRoute } from "../types";

export const fetchDrivenRoutesByDates = async (
  jwt: string,
  dateRange: DatesRangeValue
) => {
  console.log("get Drivenroutes with data:", dateRange);
  const response = await fetch(
    "http://localhost:8080/api/drivenroute/betwenDate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },

      body: JSON.stringify(dateRange),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch drivenrotes");
  }
  return response.json();
};


export const createDrivenRoutesRequest = async (
    jwt: string,
    drivenRoutes: Omit<DrivenRoute, "drivenRouteId">
  ) => {
    console.log("get Drivenroutes with data:", drivenRoutes);
    const response = await fetch(
      "http://localhost:8080/api/drivenroute/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
  
        body: JSON.stringify(drivenRoutes),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch drivenrotes");
    }
    return response.json();
  };

  export const fetchDrivenRoutesByMonth = async (
    jwt: string,
    date: Date
  ) => {
    console.log("get Drivenroutes with month:", date);
    const response = await fetch(
      "http://localhost:8080/api/drivenroute/month",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
  
        body: JSON.stringify(date),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch drivenrotes");
    }
    return response.json();
  };

  export const deletDrivenRoutesRequest = async (
    jwt: string,
    drivenRoutes: DrivenRoute[]
  ) => {
    console.log("delet Drivenroutes :", drivenRoutes);
    const response = await fetch(
      "http://localhost:8080/api/drivenroute/delet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
  
        body: JSON.stringify(drivenRoutes),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete drivenrotes");
    }
 
    return response.ok;
  };