import { ActionIcon, Group, rem, Stack, Table, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { RoutesTable } from "./RotesTable/RoutesTable";
import { useNewRouteModalStore } from "../../../../stores/useNewRouteModalStore";

export function Routes() {

  const setIsOpen = useNewRouteModalStore((state) => state.setIsOpen)  
  return (
    <>
    <Stack>
        <Title >Strecken</Title>
        <RoutesTable/>
        <ActionIcon onClick={() => setIsOpen(true)}>
            <IconPlus />
        </ActionIcon>
      </Stack>
    </>
  );
}
