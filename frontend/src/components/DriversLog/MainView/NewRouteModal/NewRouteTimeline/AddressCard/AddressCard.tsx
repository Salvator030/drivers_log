import { Card, Grid, Group, Stack, Text } from "@mantine/core";

import { Address } from "../../../../../../types";
import classes from "./AddressCard.module.css"

interface AddressCardProps {
  address: Address | null;
}

export function AddressCard({ address }: AddressCardProps) {
  return (
    <>
      {address && (
        <Card classNames={{root: classes.root}}>
         <Stack      gap="xs">
         <Text fw={500} size="lg">{address.name}</Text>
        
        <Group gap={4}>
          <Text span>{address.street}</Text>
          <Text span c="dimmed">{address.houseNumber}</Text>
        </Group>

        <Group gap={4}>
          <Text span>{address.plz}</Text>
          <Text span>{address.place}</Text>
        </Group>
         </Stack>
        </Card>
      )}
    </>
  );
}
