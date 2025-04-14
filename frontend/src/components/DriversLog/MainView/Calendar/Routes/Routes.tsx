import {
  Button,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import { RoutesTable } from "../RotesTable/RoutesTable";
import { useTranslation } from "react-i18next";
import { useRoute } from "../../../../../hooks/useRoute";
import { DatesRangeValue } from "@mantine/dates";

interface RouteProbs {
  dateRange: DatesRangeValue | undefined;
}

export function Routes(probs: RouteProbs) {
  const { t } = useTranslation();
const { handleSaveRoutesBtn, tableBody } = useRoute();


  return (
    <>
      <Stack>
        <Title order={3}>{t("navbarSimple.lable.routes")}</Title>
        <RoutesTable tableBody={tableBody} />
        <Group>
          <Button onClick={() => handleSaveRoutesBtn(probs.dateRange)}>
          {t("route.btn.addRote")}
          </Button>
          <Button> {t("route.btn.addRote")}</Button>
        </Group>
      </Stack>
    </>
  );
}
