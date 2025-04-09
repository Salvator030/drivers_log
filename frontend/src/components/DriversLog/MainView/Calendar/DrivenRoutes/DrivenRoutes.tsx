import { Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export function DrivenRoutes(){
       const { t, i18n } = useTranslation();

       return ( <><Title>{t('drivenRoutes.title')}</Title>
       </>)
}