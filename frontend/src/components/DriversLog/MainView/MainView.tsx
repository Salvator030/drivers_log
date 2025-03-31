import { Text } from "@mantine/core";
import { useMainContentStore } from "../../../hooks/useMainContentStore";

export function MainView(){
    const content = useMainContentStore((state) => state.content); // Zustand-Hook zum Abrufen des JWT-Token

    return (<>{content === "Kalender" && (<Text>Kalendar</Text>)}
    {content === "Strecken" && (<Text>Strecken</Text>)}</>);
}