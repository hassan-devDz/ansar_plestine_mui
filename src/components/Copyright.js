import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Container, Grid } from "@mui/material";
export default function Copyright() {
  return (
    <>
      <Grid
        container
        py={3}
        sx={{
          justifyContent: {
            xs: "center",
            sm: "space-between",
          },
        }}
        component={Container}
      >
        <Typography variant="caption" color="grey.500" component={"div"}>
          جميع حقوق النشر محفوظة لموقع{" "}
          <MuiLink
            color="primary"
            href="https://twitter.com/benhanatamer"
            target="_blank"
            rel="noopener"
          >
            أنصار فلسطين
          </MuiLink>{" "}
          © {new Date().getFullYear()}.
        </Typography>

        <Typography variant="caption" color="grey.500" component={"div"}>
          تصميم{" "}
          <MuiLink
            color="primary"
            href="https://twitter.com/benhanatamer"
            target="_blank"
            rel="noopener"
          >
            بن حنة ثامر
          </MuiLink>{" "}
        </Typography>
      </Grid>
    </>
  );
}
