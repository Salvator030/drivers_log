import { DatesRangeValue } from "@mantine/dates";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DataPickerState {
    datesRangeValue: DatesRangeValue;
    setDataRAngeValue: (datesRangeValue:DatesRangeValue) => void;
}

export const useDataPickerStore= create<DataPickerState>()(
    persist(
        (set)=> ({
            datesRangeValue: [new Date(),null],
         setDataRAngeValue: (datesRangeValue:DatesRangeValue) =>  set({datesRangeValue: datesRangeValue})


        }), {name: "datapicker-storage"}
    )
   
)