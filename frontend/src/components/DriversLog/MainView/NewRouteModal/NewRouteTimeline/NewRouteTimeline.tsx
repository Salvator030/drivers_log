import { Text, TextInput, Timeline } from "@mantine/core";
import { act } from "react";

import { useNewRouteTimeline } from "../../../../../hooks/useNewRouteTimeline";
import { AddressCard } from "./AddressCard/AddressCard";
import { useNewRouteModalStore } from "../../../../../stores/useNewRouteModalStore";
import { useShallow } from "zustand/shallow";
import classes from "./NewRouteTimeline.module.css"



export function NewRouteTimeline() {

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
          <Timeline.Item  title="Start Adresse">
        {startAddress && <AddressCard address={startAddress}/>}
      </Timeline.Item>

      <Timeline.Item  title="Ziel Adresse">
        {endAddress && <AddressCard address={endAddress}/>}
      </Timeline.Item>

      <Timeline.Item  title="Entfernung" >
       {distance&& <Text className={classes.distanceText}>{distance} KM</Text>}
      </Timeline.Item>

   
    </Timeline>
  );
}
