import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function CustomSnackbar({ open, onClose, message }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={onClose} severity={"error"} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
