"use client";
import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function CustomDatePicker() {
  const [value, setValue] = useState<Dayjs | null>(null);
  console.log("CustomDatePicker", value);
  return (
    <>
      <DateTimePicker
        label="Controlled picker"
        value={value}
        onChange={(newValue) => setValue(newValue ? dayjs.utc(newValue) : null)}
      />
    </>
  );
}
