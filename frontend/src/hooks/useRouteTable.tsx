import { JSX, useEffect, useState } from "react";
import { useRouteStore } from "../stores/useRouteStore";
import { Table } from "@mantine/core";
import { useAddressStore } from "../stores/useAddressStore";

export const useRouteTable = () => {
  const routes = useRouteStore((state) => state.routes);
  const addresses = useAddressStore((state) => state.addresses);

  const [tableBody, setTableBody] = useState<JSX.Element[]>([]);

  const emtyTable = 
    <Table.Tr>
    <Table.Td colSpan={4} ta="center" c="dimmed">
        No routes found
    </Table.Td>
    </Table.Tr>

  ;




  useEffect(() => {
    if (routes) {
      const rows = routes.map((route, index) => {
        const startAddress = addresses?.find(
          (address) => address.id === route.startAddressId
        );
        const endAddress = addresses?.find(
          (address) => address.id === route.endAddressId
        );
        if (!startAddress || !endAddress) return null;
        console.log("star-endAdress: " + startAddress + " " + endAddress)
        return (
          <Table.Tr key={index}>
            <Table.Td>{startAddress.name}</Table.Td>
            <Table.Td>{endAddress.name}</Table.Td>
            <Table.Td>{route.distance} KM</Table.Td>
          </Table.Tr>
        );
      })
      .filter((row): row is JSX.Element => row !== null); // Type Guard
     
      
      setTableBody(rows);
    }
  }, [addresses, routes]);

  return {tableBody, emtyTable}
};
