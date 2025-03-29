import React from "react";
import logo from "./logo.svg";
import "@mantine/core/styles.css"; // Füge dies hinzu
import { MantineProvider } from "@mantine/core";
import { MainContainer } from "./components/MainContainer/MainContainer";
import {theme} from "./AppStylex";

function App() {
  

  return (
    <MantineProvider theme={theme} >
      <MainContainer />
    </MantineProvider>
  );
}

export default App;
