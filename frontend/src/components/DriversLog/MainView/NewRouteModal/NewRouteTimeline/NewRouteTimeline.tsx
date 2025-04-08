import { Text, TextInput, Timeline } from "@mantine/core";
import { act } from "react";

import { useNewRouteTimeline } from "../../../../../hooks/useNewRouteTimeline";
import { AddressCard } from "./AddressCard/AddressCard";
import { useNewRouteModalStore } from "../../../../../stores/useNewRouteModalStore";
import { useShallow } from "zustand/shallow";
import classes from "./NewRouteTimeline.module.css"
import { useTranslation } from "react-i18next";



export function NewRouteTimeline() {
     const { t, i18n } = useTranslation();
    const { active,startAddress,endAddress} = useNewRouteTimeline()
    const { isOpen, endAdress, distance } =
    useNewRouteModalStore(
      useShallow((state) => ({
        isOpen: state.isOpen,
        endAdress: state.endAdress,
        distance: state.distance,
        
      
      }))
    );
  return (
    <Timeline active={active}>
          <Timeline.Item  title={t('newRouteTimeline.start')}>
        {startAddress && <AddressCard address={startAddress}/>}
      </Timeline.Item>

      <Timeline.Item  title={t('newRouteTimeline.end')}>
        {endAddress && <AddressCard address={endAddress}/>}
      </Timeline.Item>

      <Timeline.Item  title={t('newRouteTimeline.dist')} >
       {distance&& <Text className={classes.distanceText}>{distance} KM</Text>}
      </Timeline.Item>

   
    </Timeline>
  );
}
