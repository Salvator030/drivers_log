import { ActionIcon, Group, rem, Stack, Table, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { RoutesTable } from "./RotesTable/RoutesTable";
import { useNewRouteModalStore } from "../../../../stores/useNewRouteModalStore";
import { useTranslation } from "react-i18next";

export function Routes() {
  const { t, i18n } = useTranslation();
  const setIsOpen = useNewRouteModalStore((state) => state.setIsOpen)  
  return (
    <>
    <Stack>
        <Title order={3}>{t('navbarSimple.lable.routes')}</Title>
        <RoutesTable/>
        <ActionIcon onClick={() => setIsOpen(true)}>
            <IconPlus />
        </ActionIcon>
      </Stack>
    </>
  );
}
