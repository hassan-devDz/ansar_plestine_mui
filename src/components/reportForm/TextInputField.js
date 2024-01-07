// TextInputField.js
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

function TextInputField  ({ name, label,type="text",trigger, control, errors ,...props}){
  
  return (
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
  );
};

export default TextInputField;
