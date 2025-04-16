import { Address } from "../types";

const addresPrefix: string = "http://localhost:8080/api/address/";

// address.ts
export const fetchAddressRequest = async (jwt: string) => {
  console.log("jwt:", jwt);
  const response = await fetch(`${addresPrefix}getAll`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!response.ok) {console.log("res ", response);throw new Error('Network response was not ok ' );}
  return response.json(); // Korrektur: json() muss aufgerufen werden
};

export const createAddressRequest = async (
  jwt: string, 
  addressData: Omit<Address, 'id'>
) => {
  console.log("Creating address with data:", addressData);
  const response = await fetch(`${addresPrefix}create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
   
    body: JSON.stringify(addressData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create address");
  }
  console.log("Response:", response);
  return response.json();
};