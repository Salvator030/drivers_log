import { DatesRangeValue } from "@mantine/dates";
import { DrivenRoute } from "../types";

export const fetchDrivenRoutesByDates = async (
  jwt: string,
  dateRange: Omit<DatesRangeValue, "">
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


export const createDrivenRoureRequest = async (
    jwt: string,
    drivenRoute: Omit<DrivenRoute, "drivenRouteId">
  ) => {
    console.log("get Drivenroutes with data:", drivenRoute);
    const response = await fetch(
      "http://localhost:8080/api/drivenroute/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
  
        body: JSON.stringify(drivenRoute),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch drivenrotes");
    }
    return response.json();
  };