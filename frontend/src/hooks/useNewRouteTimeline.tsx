import {  useEffect, useState } from "react";
import { useNewRouteModalStore } from "../stores/useNewRouteModalStore";
import { useShallow } from "zustand/shallow";

export function useNewRouteTimeline(){

    const [active , setActive] = useState<number>(0)
    
    const {startAddress, endAddress} = useNewRouteModalStore(useShallow((state) => ({
        startAddress: state.startAdress,
        endAddress: state.endAdress,
    })))

    useEffect(() => {
        if (!startAddress  && !endAddress ) {
            setActive(0)
        } else if (startAddress && !endAddress) {
            setActive(1)
        } else {
            setActive(2)
        }
    }, [startAddress, endAddress])

    return {active, startAddress, endAddress}
}