import { Table } from "@mantine/core";
import { FullValueRoute } from "../../../../../types";
import { useState } from "react";

interface TableRowProps {
  route: FullValueRoute;
  changeSelectedRoutes: (id: number) => void;
}

export function RoutesTableRow(probs: TableRowProps) {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <Table.Tr
      style={selected ? { backgroundColor: "gray" } : {}}
      onClick={() => {
        setSelected(!selected);
        console.log("id: ",probs.route.routeId)
        if (probs.route.routeId !== null) {
          probs.changeSelectedRoutes(probs.route.routeId);
        }
      }}
    >
      <Table.Td>{probs.route.startAddress.name}</Table.Td>
      <Table.Td>{probs.route.endAddress.name}</Table.Td>
      <Table.Td>{probs.route.distance} KM</Table.Td>
    </Table.Tr>
  );
}
