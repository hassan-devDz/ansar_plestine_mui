// SelectField.js
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";

function SelectField  ({ name, label, options, control, errors ,  gridProps,...props}) {
  return (
    <Grid {...gridProps}>
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
    </Grid>
  );
};

export default SelectField;
