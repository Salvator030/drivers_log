import { use, useState } from "react";
import { Registration } from "../Authentication/Registration/Registration";
import { Button, Title } from "@mantine/core";
import { Login } from "../Authentication/Login/Login";
import { Authentication } from "../Authentication/Authentication";
import { useJwtStore } from "../../hooks/useJwtStore";
import { DriversLog } from "../DriversLog/DriversLog";
import { useTranslation } from "react-i18next";

export function MainContainer() {

  const jwt = useJwtStore((state) => state.jwt); // Zustand-Hook zum Abrufen des JWT-Token
  const { t, i18n } = useTranslation();

  return (
    <>
      <Title order={1}>{t('mainContainer.title')}</Title>
      {jwt != null ?  <DriversLog/> : <Authentication/>}
      
    </>
  );
}
