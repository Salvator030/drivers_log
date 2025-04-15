import { Grid, Group, HoverCard, Table } from "@mantine/core";
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
    key={`dRouteTable_${probs.route.routeId}`}
      style={selected ? { backgroundColor: "gray" } : {}}
      onClick={() => {
        setSelected(!selected);
        console.log("id: ", probs.route.routeId);
        if (probs.route.routeId !== null) {
          probs.changeSelectedRoutes(probs.route.routeId);
        }
      }}
    >
     
        <HoverCard width={250} shadow="md">
          <HoverCard.Target>
            <Table.Td>{probs.route.startAddress.name}</Table.Td>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Grid>
              <Grid.Col span={8}>{probs.route.startAddress.street}</Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={4}>{probs.route.startAddress.houseNumber}</Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={4}>{probs.route.startAddress.plz}</Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={8}>{probs.route.startAddress.place}</Grid.Col>
            </Grid>
          </HoverCard.Dropdown>
        </HoverCard>
  

   
        <HoverCard width={300} shadow="md">
          <HoverCard.Target>
            <Table.Td>{probs.route.endAddress.name}</Table.Td>
          </HoverCard.Target>
          <HoverCard.Dropdown>
          <Grid>
              <Grid.Col span={8}>{probs.route.endAddress.street}</Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={4}>{probs.route.endAddress.houseNumber}</Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={4}>{probs.route.endAddress.plz}</Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={8}>{probs.route.endAddress.place}</Grid.Col>
            </Grid>
          </HoverCard.Dropdown>
        </HoverCard>
      

     
            <Table.Td>{probs.route.distance} KM</Table.Td>
       
    </Table.Tr>
  );
}
