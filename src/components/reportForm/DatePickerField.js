// DatePickerField.js
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ar";

const DatePickerField = ({ name, label, control, errors ,...props}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
      <Controller
        name={name}
        control={control}
        defaultValue={dayjs}
        render={({ field }) => (
          <DatePicker
            label={label}
            value={field.value}
            format="YYYY/MM/DD"
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors[name],
                helperText: errors[name]?.message,
              },
            }}
            {...props}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerField;
