// CheckboxField.js
import { FormControlLabel, Checkbox,Typography } from "@mui/material";
import Link from "next/link";
import { Controller } from "react-hook-form";

const CheckboxField = ({  control, errors,...props }) => {
  return (
    <>
      {" "}
      <Controller
        name="termsAndPrivacy"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            sx={{ cursor: "auto" }}
            control={
              <Checkbox
                {...field}
                checked={field.value}
                color={errors ? "error" : "primary"}
              />
            }
            label={
              <span>
                أوافق على{" "}
                <Typography component={Link} color={"primary"} href="/terms">
                  شروط الخدمة
                </Typography>{" "}
                و{" "}
                <Typography component={Link} color={"primary"} href="/privacy">
                  سياسة الخصوصية{" "}
                </Typography>
              </span>
            }
            {...props}
          />
        )}
      />
      {errors && (
        <Typography color="error" fontSize={"0.75rem"}>
          {errors.message}
        </Typography>
      )}
    </>
  );
};

export default CheckboxField;
