import { use, useState } from "react";
import { Registration } from "../Authentication/Registration/Registration";
import { Button, Title } from "@mantine/core";
import { Login } from "../Authentication/Login/Login";
import { Authentication } from "../Authentication/Authentication";
import { useJwtStore } from "../../stores/useJwtStore";
import { DriversLog } from "../DriversLog/DriversLog";

export function MainContainer() {

  const jwt = useJwtStore((state) => state.jwt); // Zustand-Hook zum Abrufen des JWT-Token


  return (
    <>
      <Title order={1}>Drivers Log</Title>
      {jwt != null ?  <DriversLog/> : <Authentication/>}
      
    </>
  );
}
