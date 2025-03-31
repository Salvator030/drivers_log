import { Grid } from "@mantine/core";
import { NavbarSimple } from "./NavbarSimple/NavbarSimple";
import { MainView } from "./MainView/MainView";

export function DriversLog() {

  return (
    <>
      <Grid>
        <Grid.Col span="content">
          <NavbarSimple />
        </Grid.Col>
        <Grid.Col span="auto">
          <MainView />
        </Grid.Col>
      </Grid>
    </>
  );
}
