import { Text } from "@mantine/core";
import { useMainContentStore } from "../../../stores/useMainContentStore";
import { Routes } from "./Routes/Routes";
import { NewRouteModal } from "./NewRouteModal/NewRouteModal";

export function MainView() {
  const content = useMainContentStore((state) => state.content); // Zustand-Hook zum Abrufen des JWT-Token

  return (
    <>
      {content === "Kalender" && <Text>Kalendar</Text>}
      {content === "Strecken" && <Routes />}
      <NewRouteModal />
    </>
  );
}
