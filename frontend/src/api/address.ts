import { Address } from "../types";

// address.ts
export const fetchAddressRequest = async (jwt: string) => {
  const response = await fetch("http://localhost:8080/api/address/getAll", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json(); // Korrektur: json() muss aufgerufen werden
};

export const createAddressRequest = async (
  jwt: string, 
  addressData: Omit<Address, 'id'>
) => {
  console.log("Creating address with data:", addressData);
  const response = await fetch("http://localhost:8080/api/address/create", {
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