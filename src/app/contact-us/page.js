"use client";
import { contactFormSchema } from "@/validation/ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import MuiButton from "@/components/MuiButton";
import ReCAPTCHA from "react-google-recaptcha";

import TextInputField from "@/components/reportForm/TextInputField";
import Loading from "@/components/Loading";
import ReportSent from "@/components/reportForm/ReportSent";
import Grid from "@mui/material/Unstable_Grid2";
import "dayjs/locale/ar";
import NotificationSnackbar from "@/components/NotificationSnackbar";

export default function ContactUs() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactFormSchema) });

  const recaptchaRef = useRef(null);
  const [submitData, setSubmitData] = useState("");
  const [pageloading, setPageLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  async function onSubmit(data) {
    setSubmitData(data);
    recaptchaRef.current.execute();
  }

  async function onReCAPTCHAChange(captchaCode) {
    if (!captchaCode) {
      return;
    }
    setPageLoading(true);
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
        setPageLoading(false);
        setShowSuccessMessage(true);
        await recaptchaRef.current.reset();
        //await reset();
      } else {
        setSnackbarMessage("فشل إرسال النموذج. يرجى المحاولة مرة أخرى");
        setPageLoading(false);
        setSnackbarOpen(true);
        throw new Error("Failed to submit form data");
      }
    } catch (error) {
      setSnackbarMessage("فشل إرسال النموذج. يرجى المحاولة مرة أخرى");
      setPageLoading(false);
      setSnackbarOpen(true);
      throw new Error("Failed to submit form data");
    }
  }
  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  }
  return (
    <Container sx={{ mt: 1, pt: 6 }}>
      {showSuccessMessage ? (
        <ReportSent reset={reset} setSuccess={setShowSuccessMessage} />
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
              <TextInputField
                name="name"
                label="الاسم"
                control={control}
                errors={errors.name}
                gridProps={{ xs: 12 }}
              />
              <TextInputField
                name="email"
                label="البريد الإلكتروني"
                type="email"
                control={control}
                errors={errors.email}
                gridProps={{ xs: 12 }}
              />
              <TextInputField
                name="subject"
                label="موضوع الرسالة"
                control={control}
                errors={errors.subject}
                gridProps={{ xs: 12 }}
              />{" "}
              <TextInputField
                name="message"
                multiline
                rows={4}
                label="الرسالة"
                control={control}
                errors={errors.message}
                gridProps={{ xs: 12 }}
              />
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
          <NotificationSnackbar
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
          <Loading loading={pageloading} />
        </>
      )}
    </Container>
  );
}
