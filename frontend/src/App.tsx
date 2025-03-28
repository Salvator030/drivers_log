import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import {MainContainer} from "./components/MainContainer/MainContainer";

function App() {
  return <MantineProvider>
    <MainContainer/>
  </MantineProvider>;
}

export default App;
