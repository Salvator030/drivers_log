import { Text } from "@mantine/core";
import { useMainContentStore } from "../../../stores/useMainContentStore";
import { Routes } from "./Calendar/Routes/Routes";
import { NewRouteModal } from "./NewRouteModal/NewRouteModal";
import { useTranslation } from "react-i18next";
import { Calendar } from "./Calendar/Calendar";

export function MainView() {
  const content = useMainContentStore((state) => state.content); // Zustand-Hook zum Abrufen des JWT-Token
 const { t, i18n } = useTranslation();
  return (
    <>
      {content === t('navbarSimple.lable.calendar') && <Calendar/>}
   
      <NewRouteModal />
    </>
  );
}
