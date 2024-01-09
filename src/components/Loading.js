import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading({ loading }) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
      }}
      open={loading}
    >
      {" "}
      <Typography
        variant="h4"
        pb={4}
        fontWeight={400}
        textAlign="center"
        color="#fff"
      >
        جاري الارسال ! . يرجى الانتظار قليلاً .{" "}
      </Typography>{" "}
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
