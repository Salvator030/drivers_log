import { Grid } from "@mantine/core";
import { DatePicker, DatesProvider } from "@mantine/dates";
import { useState } from "react";
import 'dayjs/locale/de';
import { Routes } from "./Routes/Routes";
import { DrivenRoutes } from "./DrivenRoutes/DrivenRoutes";

export function Calendar() {

  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
 
  // const {datesRangeValue, setDatesRangeValue} =  useDataPickerStore(useShallow((state) => ({
  //   datesRangeValue: state.datesRangeValue,
  //   setDatesRangeValue: state.setDataRAngeValue
  // })))
  return (
    <>
   
      <Grid mb={32}>
      <DatesProvider settings={{ locale: 'de' }} >
      <DatePicker
      size="lg"
        type="range"
        value={value}
        onChange={setValue}
        defaultDate={new Date(Date.now())}
        allowSingleDateInRange 
      />
          </DatesProvider>
          <DrivenRoutes datesRangeValue={value}/>
          </Grid>
          <Routes dateRange={value}/>
    </>
  );
}
