import { Accordion, Button, Group, Stack, Title } from "@mantine/core";
import { RoutesTable } from "../RotesTable/RoutesTable";
import { useTranslation } from "react-i18next";
import { useRoute } from "../../../../../hooks/useRoute";
import { DatesRangeValue } from "@mantine/dates";
import { useNewRouteModalStore } from "../../../../../stores/useNewRouteModalStore";

interface RouteProbs {
  dateRange: DatesRangeValue | undefined;
}

export function Routes(probs: RouteProbs) {
  const { t } = useTranslation();
  const { handleSaveRoutesBtn, handelNewRoteBtn, tableBody } = useRoute();

  return (
    <>
      <Accordion>
        <Accordion.Item value="strecken">
          <Accordion.Control>
          <Title order={3}>  {t("navbarSimple.lable.routes")}</Title>
          </Accordion.Control>
          <Accordion.Panel>
            {" "}
            <Stack>
             
              <RoutesTable tableBody={tableBody} />
              <Group>
                <Button onClick={() => handleSaveRoutesBtn(probs.dateRange)}>
                  {t("route.btn.addRote")}
                </Button>
                <Button onClick={handelNewRoteBtn}>
                  {" "}
                  {t("route.btn.newRoute")}
                </Button>
              </Group>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
