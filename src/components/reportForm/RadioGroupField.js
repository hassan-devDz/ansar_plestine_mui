  
  import React from 'react'
  import {
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
  } from "@mui/material";
  import { Controller } from "react-hook-form";
  export default function RadioGroupField({ name, control, }) {
    return (
      <Controller
        name="hasCasualties"
        control={control}
        defaultValue="no"
        render={({ field }) => (
          <FormControl component="fieldset" id="hasCasualties">
            <FormLabel component="legend"> هل هناك قتلى أو جرحى؟</FormLabel>
            <RadioGroup {...field} aria-label="hasCasualties" row>
              <FormControlLabel value="yes" control={<Radio />} label="نعم" />
              <FormControlLabel value="no" control={<Radio />} label="لا" />
            </RadioGroup>{" "}
          </FormControl>
        )}
      />
    );
  }
  
 