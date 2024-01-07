// ReportForm.js
"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Typography } from "@mui/material";
import { Suspense } from "react";
import React,{ useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { contactFormSchema } from "@/validation/ValidationSchema";
import Image from "next/image";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ReCAPTCHA from "react-google-recaptcha";
import MuiButton from "@/components/MuiButton";

import TextInputField from "@/components/reportForm/TextInputField";

import "dayjs/locale/ar";
import Grid from "@mui/material/Unstable_Grid2";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function ContactUs() {
  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({ resolver: yupResolver(contactFormSchema) });

  const recaptchaRef = useRef(null);
  const [submitData, setSubmitData] = useState("");
  const [pageloading, setpageLoding] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [state, setState] = useState(false);
  async function onSubmit(data) {
    setSubmitData(data);
    recaptchaRef.current.execute();
  }

  async function onReCAPTCHAChange(captchaCode) {
    if (!captchaCode) {
      return;
    }
    setpageLoding(true);
    const data = await { ...submitData, captcha: captchaCode };

    try {
      const response = await axios.post(
        "/contact-us/api",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          // onUploadProgress: (progressEvent) =>
          //   console.log(progressEvent.loaded),
        }
      );

      // إظهار رسالة نجاح أو إجراء تحويلات
      if (response.data) {
        setpageLoding(false);
        setShowSuccessMessage(true);
     
       
       await recaptchaRef.current.reset(); 
        //await reset();
      }
      if (!response.data) {
        setpageLoding(false);
        setState(true)
        throw new Error("Failed to submit form data");
      }
    } catch (error) {
      setState(true);
      setpageLoding(false);
      //console.error("Error submitting form data:", error);
      // إظهار رسالة خطأ
    }
  }
  const handleClose = () => {
    setState(false);
  };
  return (
    <Container sx={{ mt: 1, pt: 6 }}>
      {showSuccessMessage ? (
        <>
          <Grid
            container
            spacing={2}
            alignItems={"center"}
            m={"auto"}
            maxWidth={600}
          >
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
                  شكراً لتواصلكم! لقد تم إرسال رسالتكم بنجاح. سنقوم بالرد عليكم
                  في أسرع وقت ممكن عبر البريد الإلكتروني.{" "}
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
                    setShowSuccessMessage(false);
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
        </>
      ) : (
        <>
          {" "}
          <Typography variant="h4" pb={4} fontWeight={500} component={"h1"}>
            اتـصل بنــا :{" "}
          </Typography>
          <Typography variant="body1" pb={4} fontWeight={400} color="initial">
            مرحبًا بك في موقع{" "}
            <Typography
              variant="body1"
              color="rgb(39, 129, 37)"
              component={Link}
              href={"/"}
              fontWeight={400}
            >
              أنصار فلسطين
            </Typography>{" "}
            ، نحن هنا للاستماع إلى استفساراتك وتعليقاتك حول محتوانا المتخصص في
            مجال الجرائم و تسهيل محاسبة المرتكبين . يسرنا تلقي أي أسئلة قد تكون
            لديك أو مشاركة أفكارك حول الموضوع . يرجى عدم التردد في الاتصال بنا،
            حيث يمكننا معًا تكوين مجتمع يهتم بمكافحة الجريمة وفهمها بشكل أفضل .
            نحن هنا لخدمتك والاستماع إلى ملاحظاتك.{" "}
          </Typography>
          <Grid
            container
            spacing={2}
            alignItems={"center"}
            sx={{
              flexDirection: { xs: "column-reverse", sm: "row" },
            }}
          >
            <Grid
              container
              xs={12}
              sm={6}
              component={"form"}
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              noValidate
            >
              {" "}
              <Grid xs={12}>
                <TextInputField
                  name="name"
                  label="الاسم"
                  control={control}
                  errors={errors.name}
                />
              </Grid>
              <Grid xs={12}>
                <TextInputField
                  name="email"
                  label="البريد الإلكتروني"
                  type="email"
                  control={control}
                  errors={errors.email}
                />
              </Grid>
              <Grid xs={12}>
                <TextInputField
                  name="subject"
                  label="موضوع الرسالة"
                  control={control}
                  errors={errors.subject}
                />
              </Grid>
              <Grid xs={12}>
                {" "}
                <TextInputField
                  name="message"
                  multiline
                  rows={4}
                  label="الرسالة"
                  control={control}
                  errors={errors.message}
                />
              </Grid>{" "}
              <Grid xs={12}>
                <MuiButton
                  component="button"
                  type="submit"
                  variant="contained"
                  color="primary"
                  width="100%"
                  maxWidth={"100%"}
                  disabled={pageloading}
                >
                  إرســــال
                </MuiButton>{" "}
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} pb={10}>
              <Image
                src="/Illustration.png"
                width={568}
                height={472}
                style={{
                  width: "100%",
                  height: "auto",
                }}
                alt="اتصل بنا"
              />
            </Grid>
          </Grid>{" "}
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            hl="ar"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
            badge="bottomright"
          />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={state}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              فشل الارسال يرجى المحاولة لاحقا
            </Alert>
          </Snackbar>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              display: "flex",
              flexDirection: "column",
            }}
            open={pageloading}
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
        </>
      )}
    </Container>
  );
}
