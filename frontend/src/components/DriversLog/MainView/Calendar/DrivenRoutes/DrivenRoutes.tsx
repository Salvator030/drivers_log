import { px, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { RoutesTable } from "../RotesTable/RoutesTable";
import { useDrivenRoute } from "../../../../../hooks/useDrivenRoute";


interface DrivenRoutesComponentProps {
       datesRangeValue: [Date | null, Date | null],
}
export function DrivenRoutes(probs: DrivenRoutesComponentProps){
       const { t, i18n } = useTranslation();
       const {tableBody} = useDrivenRoute(probs.datesRangeValue);
      


       return ( <Stack ml={px(16)} mt={px(8)}><Title order={3}>{t('drivenRoutes.title')}</Title>
                 <RoutesTable tableBody={tableBody}/>

       </Stack>)
}