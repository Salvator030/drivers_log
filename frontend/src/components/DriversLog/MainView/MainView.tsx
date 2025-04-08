import { Text } from "@mantine/core";
import { useMainContentStore } from "../../../stores/useMainContentStore";
import { Routes } from "./Routes/Routes";
import { NewRouteModal } from "./NewRouteModal/NewRouteModal";
import { useTranslation } from "react-i18next";

export function MainView() {
  const content = useMainContentStore((state) => state.content); // Zustand-Hook zum Abrufen des JWT-Token
 const { t, i18n } = useTranslation();
  return (
    <>
      {content === t('navbarSimple.lable.calendar') && <Text>Kalendar</Text>}
      {content === t('navbarSimple.lable.routes') && <Routes />}
      <NewRouteModal />
    </>
  );
}
