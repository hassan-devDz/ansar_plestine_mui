// ReportForm.js
"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  SvgIcon,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  FormHelperText,
  Alert,
} from "@mui/material";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { schema } from "@/validation/ValidationSchema";
import {
  CRIMES,
  SUPPORTED_FORMATS,
  RELATION_OPTIONS,
} from "@/data/reportFormConstants";
import axios from "axios";

import ReCAPTCHA from "react-google-recaptcha";
import MuiButton from "@/components/MuiButton";

import TextInputField from "./TextInputField";
import SelectField from "./SelectField";
import AutocompleteField from "./AutocompleteField";
import DatePickerField from "./DatePickerField";
import CheckboxField from "./CheckboxField";
import "dayjs/locale/ar";
import Grid from "@mui/material/Unstable_Grid2";
import theme from "../ThemeRegistry/theme";

/**
 * تحويل كائن JavaScript إلى كائن FormData
 * @param {Object} obj - الكائن الذي يجب تحويله إلى FormData
 * @param {FormData} formData - كائن FormData يتم تحديثه خلال عملية التحويل
 * @param {string} key - المفتاح الحالي (يستخدم لتكوين الأسماء في FormData)
 * @returns {FormData} - كائن FormData بعد التحويل
 */
function getFormData(obj = {}, formData = new FormData(), key = "") {
  // التحقق مما إذا كان نوع الكائن غير قابل للتحويل
  if (![Array, File, Date, Object].includes(obj.constructor)) {
    return formData;
  }

  // التعامل مع نوع الملف
  if (obj instanceof File) {
    formData.append(key, obj);
    
  }

  // الدخول في حلقة لمعالجة الخصائص
  for (const prop in obj) {
    // التحقق من نوع القيمة وتجنب أنواع غير صالحة
    if (
      obj[prop] &&
      ![String, Number, Boolean, Date, Array, Object, File, FileList].includes(
        obj[prop].constructor
      )
    ) {
      continue;
    }

    // تكوين المفتاح العميق
    const deepKey = key ? key + `[${prop}]` : prop;

    // التعامل مع نوع FileList
    if (obj[prop] instanceof FileList ) {
      for (let i = 0; i < obj[prop].length; i++) {
        formData.append(`${deepKey}`, obj[prop][i]);
      }
      continue;
    }

    // التعامل مع نوع Date
    if (obj[prop] instanceof Date) {
      formData.append(`${deepKey}`, obj[prop]);
      continue;
    }
    if(Array.isArray(obj[prop]) && obj[prop].some((item) =>  item instanceof File)){
      for (let i = 0; i < obj[prop].length; i++) {
        formData.append(`${deepKey}`, obj[prop][i]);
      }
      continue;
    }

    // التعامل مع مصفوفة
    if (Array.isArray(obj[prop]) && !(obj[prop].some((item) =>  item instanceof File))) {
      console.log(obj[prop] instanceof File,);
      // if (item instanceof File) {
      //       formData.append(deepKey, item);
      //     }
      const arrayValue = obj[prop]
        .map((item) => {
          
          console.log(item instanceof File,typeof item);
          return  item === undefined || item === null
            ? ""
            : item.toString();
        })
        .join(",");
      formData.append(deepKey, arrayValue);
      continue;
    }

    // التعامل مع كائن
    if (typeof obj[prop] === "object" && obj[prop] !== null) {
      getFormData(obj[prop], formData, deepKey);
    } else {
      // التعامل مع string, number, boolean
      formData.append(
        deepKey,
        [undefined, null].includes(obj[prop]) ? "" : obj[prop]
      );
    }
  }

  return formData;
}


export default function ReportForm() {
  const [filePreviews, setFilePreviews] = useState([]);
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
   
   
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hasCasualties: "no", // تعيين القيمة الافتراضية لـ hasCasualties
      victims: { typeOfStatistic: null },
    },
  });
  console.log(errors[""]);
  const hasCasualties = watch("hasCasualties");
  const recaptchaRef = useRef(null);
  const [submitData, setSubmitData] = useState("");
  const [pageloading, setpageLoding] = useState(false);

  const [sendData, setSendData] = useState(false);
  async function onSubmit(data) {
    // setSubmitData(data);
    // recaptchaRef.current.execute();
   
    
    setpageLoding(true);
    const formData = await getFormData(data)
    console.log(data,formData);
   
    


    // try {
    //   const response = await fetch("https://media.benhanatamer.com/uploads/", {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //       // إذا كنت بحاجة لإرسال رؤوس الطلب، يمكنك إضافتها هنا
    //       "Content-Type": "multipart/form-data"
    //     },
    //   });

    //   if (response.ok) {
    //     const responseData = await response.json();
    //     // إظهار رسالة نجاح أو إجراء تحويلات
    //     if (responseData) {
    //       setpageLoding(false);
    //       setSendData(true);
    //       //reset();
    //     } else {
    //       setpageLoding(false);
    //       throw new Error("Failed to submit form data");
    //     }
    //   } else {
    //     setpageLoding(false);
    //     throw new Error(`Request failed with status: ${response.status}`);
    //   }
    // } catch (error) {
    //   setpageLoding(false);
    //   console.error("Error submitting form data:", error);
    //   // إظهار رسالة خطأ
    // }

    try {
      const response = await axios.post(
        "http://localhost:5000/uploads",
        formData,
        {
          headers: {
            // "Access-Control-Allow-Origin": "*",

            "Content-Type": "multipart/form-data",
          },
        }
      )
console.log(response);
      // إظهار رسالة نجاح أو إجراء تحويلات
      if (response.data) {
        setpageLoding(false);
        setSendData(true);
        //reset();
      }
      if (!response.data) {
        setpageLoding(false);
        console.log(response);
        throw new Error("Failed to submit form data");
      }
    } catch (error) {
      setpageLoding(false);
      console.error("Error submitting form data:", error);
      // إظهار رسالة خطأ
    }

  }

  async function onReCAPTCHAChange(captchaCode) {
    if (!captchaCode) {
      return;
    }
    setpageLoding(true);
    const formData = new FormData();
    const data = await { ...submitData, captcha: captchaCode };
    // for (const key in data) {
    //   if (data.hasOwnProperty(key) && key !== "files") {
    //     console.log(key,data[key]);
    //     formData.append(key, data[key]);
    //   }
    // }

    // إضافة الملفات
    if (data.files.length) {
      for (const file of data.files) {
        formData.append("files", file);
      }
      //   for (let i = 0; i < data.files.length; i++) {
      //   formData.append(data.files[i].name, data.files[i]);
      // }
    }
    console.log(formData);

    try {
      const response = await fetch(`localhost:5000/uploads`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },

        body: formData,
      });

      // التحقق من نجاح الطلب
      if (!response.ok) {
        setpageLoding(false);
        throw new Error(
          `Failed to submit form data. Status: ${response.status}`
        );
      }

      // قراءة البيانات من الاستجابة
      const responseData = await response.json();

      // إظهار رسالة نجاح أو إجراء تحويلات
      if (responseData) {
        setpageLoding(false);
        setSendData(true);
        reset();
      }
    } catch (error) {
      setpageLoding(false);
      console.error("Error submitting form data:", error);
      // إظهار رسالة خطأ
    }
  }
 useEffect(() => {
   if (hasCasualties === "no") {
     reset({
       ...getValues(), // الحفاظ على القيم الحالية للنموذج
       victims: {
         typeOfStatistic: null,
         numberOfShohada: { total: 0, women: 0, children: 0 },
         numberOfInjured: { total: 0, women: 0, children: 0 },
         numberOfDisplaced: 0,
       },
     });
   } else {
     setValue("victims.typeOfStatistic", "دقيقة");
   }
   
 }, [hasCasualties, reset, setValue, getValues]);




  function handleFileChange(event) {
    const files = event.target.files;
    const newSelectedFiles = Array.from(files);
    const sources = Array.from(files, (file) => ({
      src: URL.createObjectURL(file),
      type: file.type,
      alt: file.name.split(".")[0],
    }));
    const previews = newSelectedFiles.map((file) => ({
      src: URL.createObjectURL(file),
      type: file.type,
      alt: file.name.split(".")[0],
    }));
    setFilePreviews(previews);
    setSelectedFiles(newSelectedFiles);
     

   console.log(selectedFiles,filePreviews);
      // إضافة كود لعرض ملفات الفيديو
  // const videoElement = document.getElementById('videoPreview');
  // if (videoElement) {
  //   videoElement.src = URL.createObjectURL(newSelectedFiles[0]);
  //   videoElement.load();
  // }
  }
 
  
  function handleRemoveFile(index) {

    const newPreviews = [...filePreviews];
    newPreviews.splice(index, 1);
    setFilePreviews(newPreviews);
    const newSelectedFiles =  [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    // تحديث حقل الملفات في react-hook-form
    setValue("files", newSelectedFiles);
  }
  function calculateColsRows(index) {
    // تعيين القيم الافتراضية لـ cols و rows
    let cols = 1;
    let rows = 1;

    // تعديل القيم بناءً على index
    // يمكنك تعديل هذه الشروط حسب الحاجة
    if (index % 8 === 0 || index % 8 === 5) {
      // مثلاً، كل خامس صورة تأخذ مساحة أكبر
      cols = 2;
      rows = 2;
    } else if (index % 8 === 3 || index % 8 === 4) {
      // مثلاً، كل سادس صورة تأخذ عرض أكبر
      cols = 2;
      rows = 1;
    }

    return { cols, rows };
  }

  return (
    <Container sx={{ mt: 1 }}>
      <Grid
        container
        spacing={2}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        noValidate
      >
        {" "}
        <Grid xs={4}>
          <TextInputField
            name="name"
            label="الاسم"
            control={control}
            errors={errors.name}
          />
        </Grid>
        <Grid xs={8}>
          <TextInputField
            name="address"
            label="العنوان"
            control={control}
            errors={errors.address}
          />
        </Grid>
        <Grid xs={4}>
          <TextInputField
            name="phone"
            label="الهاتف"
            type="tel"
            control={control}
            errors={errors.phone}
          />
        </Grid>
        <Grid xs={4}>
          <TextInputField
            name="email"
            label="البريد الإلكتروني"
            type="email"
            control={control}
            errors={errors.email}
          />
        </Grid>
        <Grid xs={4}>
          <AutocompleteField
            name="crimeType"
            label="نوع الجريمة"
            options={CRIMES}
            control={control}
            errors={errors}
          />
        </Grid>{" "}
        <Grid xs={4}>
          <AutocompleteField
            name="responsibleParties"
            label="الأطراف المسؤولة"
            control={control}
            errors={errors}
            multiple
          />
        </Grid>
        <Grid xs={4}>
          <SelectField
            name="relation"
            label="العلاقة بالجريمة"
            options={RELATION_OPTIONS}
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid xs={4}>
          <DatePickerField
            name="crimeDate"
            label="تاريخ الجريمة"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid xs={4}>
          <TextInputField
            name="crimeLocation"
            label="مكان الجريمة"
            control={control}
            errors={errors.crimeLocation}
          />
        </Grid>
        <Grid xs={12}>
          <Controller
            name="hasCasualties"
            control={control}
            defaultValue="no"
            render={({ field, fieldState: { error } }) => (
              <FormControl component="fieldset" id="hasCasualties">
                <FormLabel component="legend">
                  {" "}
                  هل هناك قتلى أو جرحى أو نازحين ؟
                </FormLabel>
                <RadioGroup {...field} aria-label="hasCasualties" row>
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="نعم"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="لا" />
                </RadioGroup>{" "}
                {error && (
                  <FormHelperText error>{error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>{" "}
        <Grid xs={12} container component={"fieldset"} sx={{ border: "none" }}>
          <Grid
            xs={12}
            component={"legend"}
            color={errors[""] ? theme.palette.error.main : "inherit"}
          >
            تقدير عدد الضحايا{" "}
            {errors[""] && (
              <Typography color="error" fontSize={"0.75rem"}>
                {errors[""].message}
              </Typography>
            )}
          </Grid>
          <Grid xs={12}>
            {" "}
            <Controller
              name="victims.typeOfStatistic"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl
                  id="victims.typeOfStatistic"
                  disabled={hasCasualties === "no"}
                >
                  <FormLabel>
                    {" "}
                    هل الإحصائية التي تقدمها حول عدد القتلى أو الجرحى هي
                    إحصائية؟{" "}
                  </FormLabel>
                  <RadioGroup
                    {...field}
                    aria-label="victims.typeOfStatistic"
                    row
                  >
                    <FormControlLabel
                      value="دقيقة"
                      control={<Radio />}
                      label="دقيقة"
                    />
                    <FormControlLabel
                      value="أكثر من"
                      control={<Radio />}
                      label="أكثر من"
                    />
                    <FormControlLabel
                      value="تقريبة"
                      control={<Radio />}
                      label="تقريبة"
                    />
                  </RadioGroup>
                  {error && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />{" "}
          </Grid>
          <Grid xs={12} container>
            <Grid xs={4}>
              <TextInputField
                name="victims.numberOfShohada.total"
                type="number"
                disabled={hasCasualties === "no"}
                label="عدد الشهداء"
                control={control}
                errors={errors.victims?.numberOfShohada?.total}
              />
            </Grid>
            <Grid xs={4}>
              {" "}
              <TextInputField
                name="victims.numberOfShohada.women"
                type="number"
                disabled={hasCasualties === "no"}
                label="منهم نساء"
                control={control}
                errors={errors.victims?.numberOfShohada?.women}
              />
            </Grid>
            <Grid xs={4}>
              {" "}
              <TextInputField
                name="victims.numberOfShohada.children"
                type="number"
                disabled={hasCasualties === "no"}
                label="منهم أطفال"
                control={control}
                errors={errors.victims?.numberOfShohada?.children}
              />{" "}
            </Grid>
          </Grid>
          <Grid xs={12} container>
            {" "}
            <Grid xs={4}>
              {" "}
              <TextInputField
                name="victims.numberOfInjured.total"
                type="number"
                disabled={hasCasualties === "no"}
                label="عدد الجرحى"
                control={control}
                errors={errors.victims?.numberOfInjured?.total}
              />
            </Grid>
            <Grid xs={4}>
              <TextInputField
                name="victims.numberOfInjured.women"
                type="number"
                disabled={hasCasualties === "no"}
                label="منهم نساء"
                control={control}
                errors={errors.victims?.numberOfInjured?.women}
              />
            </Grid>
            <Grid xs={4}>
              <TextInputField
                name="victims.numberOfInjured.children"
                type="number"
                disabled={hasCasualties === "no"}
                label="منهم أطفال"
                control={control}
                errors={errors.victims?.numberOfInjured?.children}
              />
            </Grid>
          </Grid>
          <Grid xs={12}>
            {" "}
            <TextInputField
              name="victims.numberOfDisplaced"
              type="number"
              disabled={hasCasualties === "no"}
              label="عدد النازحين/المهجرين"
              control={control}
              errors={errors.victims?.numberOfDisplaced}
            />{" "}
          </Grid>
        </Grid>{" "}
        <Grid xs={12}>
          {" "}
          <TextInputField
            name="crimeDescription"
            multiline
            rows={4}
            label="وصف الجريمة"
            control={control}
            errors={errors.crimeDescription}
          />
        </Grid>{" "}
        <Grid xs={12}>
          {" "}
          <Controller
            name="files"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                <input
                  accept={SUPPORTED_FORMATS}
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e);
                    field.onChange(e.target.files);
                  }}
                  ref={field.ref}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    رفع صور أو فيديو
                  </Button>
                </label>
                {errors.files && (
                  <Typography color="error" fontSize={"0.75rem"}>
                    {errors.files.message}
                  </Typography>
                )}
              </>
            )}
          />{" "}
        </Grid>
        <Grid xs={12}>
          {" "}
          <ImageList
            sx={{ maxHeight: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {filePreviews &&
              filePreviews.map((preview, index) => (
                <ImageListItem
                  key={preview.src}
                  style={{
                    position: "relative",
                  }}
                  cols={calculateColsRows(index).cols}
                  rows={calculateColsRows(index).rows}
                >
                  {preview.type.startsWith("image/") ? (
                    <Image
                      src={preview.src}
                      alt={preview.alt}
                      fill
                      sizes="(min-width: 808px) 50vw, 100vw"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <video
                      width="200"
                      height="200"
                      controls
                      style={{ height: "100%", width: "100%" }}
                    >
                      {" "}
                      <source src={preview.src} type={preview.type} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <SvgIcon
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      cursor: "pointer",
                    }}
                    
                    onClick={() => handleRemoveFile(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g transform="rotate(180 12 12)">
                        <path
                          fill="currentColor"
                          d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
                        />
                      </g>
                    </svg>
                  </SvgIcon>
                </ImageListItem>
              ))}
          </ImageList>{" "}
        </Grid>
        <Grid xs={12}>
          {" "}
          <CheckboxField control={control} errors={errors.termsAndPrivacy} />
        </Grid>{" "}
        <Grid xs={12}>
          {" "}
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            hl="ar"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
            badge="bottomright"
          />{" "}
        </Grid>
        <Grid xs={12}>
          <MuiButton
            component="button"
            type="submit"
            variant="contained"
            color="primary"
            maxWidth={"100%"}
          >
            إرسال البلاغ
          </MuiButton>{" "}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            إرسال البلاغ
          </Button>{" "}
        </Grid>
      </Grid>

      {/* <FormLabel id="knowsExactNumber" disabled={hasCasualties === "no"}>
        {" "}
        هل الإحضائية التي تقدمها حول عدد القتلى أو الجرحى هي إحصائية؟{" "}
      </FormLabel>

      <Controller
        name="knowsExactNumber"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} aria-labelledby="knowsExactNumber" row>
            <FormControlLabel
              disabled={hasCasualties === "no"}
              value="yes"
              control={<Radio />}
              label="نعم"
            />
            <FormControlLabel
              disabled={hasCasualties === "no"}
              value="no"
              control={<Radio />}
              label="لا"
            />
          </RadioGroup>
        )}
      /> */}
    </Container>
  );
}
