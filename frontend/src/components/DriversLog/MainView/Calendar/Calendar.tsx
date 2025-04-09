import { px, Title } from "@mantine/core";
import { DatePicker, DatesProvider, DatesRangeValue } from "@mantine/dates";
import { useState } from "react";
import 'dayjs/locale/de';
import classes from "./Calendar.module.css";
import { Routes } from "../Routes/Routes";

export function Calendar() {
  const [value, setValue] = useState<DatesRangeValue | undefined>();
  return (
    <>
      <Title order={3}>Kalender</Title>
      <DatesProvider settings={{ locale: 'de' }}>
      <DatePicker
        type="range"
        value={value}
        onChange={setValue}
      />
          </DatesProvider>
          <Routes/>
    </>
  );
}
