import { JSX, useEffect, useState } from "react";
import { useAddressStore } from "../stores/useAddressStore";
import { Table } from "@mantine/core";
import { shallow, useShallow } from "zustand/shallow";
import { useNewRouteModalStore } from "../stores/useNewRouteModalStore";
import { Address } from "../types";
import { start } from "repl";
export function useAddressTable() {
  const addresses = useAddressStore((state) => state.addresses);
    const setAddress= useNewRouteModalStore( (state) => state.setAddress);

  const [tableBody, setTableBody] = useState<JSX.Element[]>([]);

    const handleOnClickRow = (address: Address,e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
     setAddress( address);
  
        
    }


  useEffect(() => {
    if (addresses) {
      const rows = addresses.map((address, index) => (
        <Table.Tr key={`tr_${index}`} onClick={(e) => handleOnClickRow(address,e)}   >
          <Table.Td>{address.name}</Table.Td>
          <Table.Td>{address.street}</Table.Td>
          <Table.Td>{address.houseNumber}</Table.Td>
          <Table.Td>{address.plz}</Table.Td>
          <Table.Td>{address.place}</Table.Td>
          <Table.Td>{address.info}</Table.Td>
        </Table.Tr>
      ));
      setTableBody(rows);
    }
  }, [addresses]);

  return { tableBody };
}
