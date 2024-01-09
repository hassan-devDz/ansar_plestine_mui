// TextInputField.js
import {  TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";

function TextInputField({
  name,
  label,
  type = "text",
  trigger,
  control,
  errors,
  gridProps,
  ...props
}) {
  return (
    <Grid {...gridProps}>
      <Controller
        name={name}
        control={control}
        defaultValue={type === "number" ? 0 : ""}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            fullWidth
            inputProps={{
              lang: "en",
            }}
            error={!!errors}
            helperText={errors?.message}
            {...props}
          />
        )}
      />
    </Grid>
  );
};

export default TextInputField;
