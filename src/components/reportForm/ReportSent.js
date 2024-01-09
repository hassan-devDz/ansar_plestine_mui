"use client";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import "dayjs/locale/ar";
import Grid from "@mui/material/Unstable_Grid2";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

const mesg= "شكراً لتواصلكم! لقد تم إرسال رسالتكم بنجاح. سنقوم بالرد عليكم في أسرع وقت ممكن عبر البريد الإلكتروني."
export default function ReportSent({ message = mesg, reset, setSuccess }) {
  return (
    <Grid container spacing={2} alignItems={"center"} m={"auto"} maxWidth={600}>
      <Grid xs={12} sm={12} pb={10}>
        <Image
          src="/mailsent.svg"
          width={434}
          height={336}
          style={{
            maxWidth: "434px",
            display: "block",
            margin: "auto",
            width: "100%",
            height: "auto",
          }}
          alt="تم الارسال"
        />
      </Grid>
      <Grid container xs={12} sm={12}>
        {" "}
        <Grid xs={12}>
          <Typography
            variant="body1"
            pb={4}
            fontWeight={400}
            color="green"
            textAlign="center"
          >
            {message}
          </Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <Button
            variant="contained"
            disableElevation
            size="large"
            color="primary"
            sx={{ width: "100%" }}
            onClick={() => {
              setSuccess(false);
              reset();
            }}
          >
            إرسال رسالة أخرى
          </Button>{" "}
        </Grid>
        <Grid xs={12} sm={6}>
          <Button
            variant="text"
            size="large"
            color="primary"
            component={Link}
            href="/"
            sx={{ width: "100%" }}
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </Grid>{" "}
      </Grid>
    </Grid>
  );
}
