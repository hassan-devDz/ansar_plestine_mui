import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

export default function RadioGroupController({ name, label, options, control , defaultValue}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <FormControl id={name} disabled={options.disabled}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup {...field} aria-label={name} row>
            {options.values.map((value) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={value}
              />
            ))}
          </RadioGroup>
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
