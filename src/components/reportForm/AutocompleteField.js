// AutocompleteField.js
import { Autocomplete, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Controller } from "react-hook-form";

const AutocompleteField = ({
  name,
  label,
  options,
  control,
  errors,
  
  multiple = false,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : null}
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple={multiple}
          freeSolo={true}
          fullWidth
          
          options={
            multiple
              ? []
              : options.flatMap((group) =>
                  group.items.map((item) => ({
                    title: item,
                    category: group.category,
                  }))
                )
          }
          getOptionLabel={(option) => (multiple ? option : option.title || "")}
          groupBy={(option) => option.category || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!errors[name]}
              helperText={errors[name] ? errors[name].message : ""}
            />
          )}
          onChange={(_, value) => field.onChange(value)}
          {...props}
        />
      )}
    />
  );
};

export default AutocompleteField;
