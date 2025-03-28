import React from "react";
import logo from "./logo.svg";
import "./AppStylex.tsx";
import { MantineProvider } from "@mantine/core";
import { MainContainer } from "./components/MainContainer/MainContainer";
import theme from "./AppStylex";

function App() {
  const styles = theme();

  return (
    <MantineProvider theme={styles}>
      <MainContainer />
    </MantineProvider>
  );
}

export default App;
