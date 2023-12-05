import Button from "@mui/material/Button";

import Link from "next/link";
const MuiButton = ({
  children,
  maxWidth = 176,
  component = Link,
  href = "#",
  sx,
  ...otherProps
}) => {
  return (
    <Button
      disableElevation
      component={component}
      href={component === Link ? href : null}
      sx={{
        fontSize: "1.125rem",
        color: "grey.100",
        width: "50%",
        maxWidth: maxWidth,
        py: 1.5,
        px: 0,
        lineHeight: 2,
        fontWeight: 600,
        "&:hover": {
          boxShadow:
            "0px 24px 48px 10px rgba(255, 100, 100, 0.2), 0px 32px 64px 10px rgba(255, 100, 100, 0.06)",
          backgroundColor: "primary.500",
        },
        "&.MuiButton-contained:hover": {
          color: "grey.700",
        },
        "&.MuiButton-outlined": {
          borderWidth: "4px",
          borderColor: "primary.500",
          color: "grey.700",
        },
        "&.MuiButton-outlined:hover": {
          borderWidth: "4px",
          borderColor: "grey.700",
          color: "grey.100",
        },
        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};
export default MuiButton;
