// SelectField.js
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

function SelectField  ({ name, label, options, control, errors ,...props}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormControl fullWidth error={!!errors[name]} {...props}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select {...field} labelId={`${name}-label`} label={label}>
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {errors[name] && (
            <Typography color="error" fontSize={"0.75rem"}>
              {errors[name].message}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};

export default SelectField;
