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

import { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { schema } from "@/validation/ValidationSchema";
import {
  CRIMES,
  SUPPORTED_FORMATS,
  RELATION_OPTIONS,
} from "@/data/reportFormConstants";
import axios from "axios";

import ReCAPTCHA from "react-google-recaptcha";

import TextInputField from "./TextInputField";
import SelectField from "./SelectField";
import AutocompleteField from "./AutocompleteField";
import DatePickerField from "./DatePickerField";
import CheckboxField from "./CheckboxField";
import "dayjs/locale/ar";
import Grid from "@mui/material/Unstable_Grid2";
import theme from "../ThemeRegistry/theme";
import FileUpload from "./FileUpload"; // Import the new component
import ReportSent from "./ReportSent";
import RadioGroupController from "./RadioGroupController";

const messg = `تم استلام تقريرك حول جريمة حرب بنجاح. نقدر انخراطك في الحفاظ على السلام والعدالة. سنقوم بمراجعة المعلومات التي قدمتها، ونتخذ الإجراءات اللازمة بموجب القوانين واللوائح المعمول بها.

نحن نفخر بمساهمتك في خدمة المجتمع والعمل من أجل تحقيق عالم أفضل. في حال كان لديك أي معلومات إضافية أو أسئلة، يرجى عدم التردد في الاتصال بنا.

شكرًا مرة أخرى على تعاونك واهتمامك بالقضايا الإنسانية.

مع أطيب التحيات،`;
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
    if (obj[prop] instanceof FileList) {
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
    if (
      Array.isArray(obj[prop]) &&
      obj[prop].some((item) => item instanceof File)
    ) {
      for (let i = 0; i < obj[prop].length; i++) {
        formData.append(`${deepKey}`, obj[prop][i]);
      }
      continue;
    }

    // التعامل مع مصفوفة
    if (
      Array.isArray(obj[prop]) &&
      !obj[prop].some((item) => item instanceof File)
    ) {
      // if (item instanceof File) {
      //       formData.append(deepKey, item);
      //     }
      const arrayValue = obj[prop]
        .map((item) => {
          return item === undefined || item === null ? "" : item.toString();
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
  const hasCasualties = watch("hasCasualties");
  const recaptchaRef = useRef(null);
  const [submitData, setSubmitData] = useState("");
  const [pageloading, setpageLoding] = useState(false);
  const [sendData, setSendData] = useState(false);
  async function onSubmit(data) {
    setSubmitData(data);
    await recaptchaRef.current.execute();
  }

  async function onReCAPTCHAChange(captchaCode) {
    if (!captchaCode) {
      return;
    }
    setpageLoding(true);
    const formData = await getFormData(submitData);
    await formData.append("captcha", captchaCode);

    try {
      const response = await axios.post("/report-crime/api", formData, {
        headers: {
          // "Access-Control-Allow-Origin": "*",

          "Content-Type": "multipart/form-data",
        },
      });
      // إظهار رسالة نجاح أو إجراء تحويلات
      if (response.data) {
        setpageLoding(false);
        setSendData(true);

        //reset();
      }
      if (!response.data) {
        setpageLoding(false);
        throw new Error("Failed to submit form data");
      }
    } catch (error) {
      setpageLoding(false);
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

    console.log(selectedFiles, filePreviews);
  }

  function handleRemoveFile(index) {
    const newPreviews = [...filePreviews];
    newPreviews.splice(index, 1);
    setFilePreviews(newPreviews);
    const newSelectedFiles = [...selectedFiles];
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
    <Container sx={{ mt: 1, pt: 6 }}>
      {sendData ? (
        <ReportSent message={messg} reset={reset} setSuccess={setSendData} />
      ) : (
        <Grid
          container
          spacing={2}
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
            gridProps={{ xs: 12, sm: 4 }}
          />
          <TextInputField
            name="address"
            label="العنوان"
            control={control}
            errors={errors.address}
            gridProps={{ xs: 12, sm: 8 }}
          />
          <TextInputField
            name="phone"
            label="الهاتف"
            type="tel"
            control={control}
            errors={errors.phone}
            gridProps={{ xs: 12, sm: 4 }}
          />
          <TextInputField
            name="email"
            label="البريد الإلكتروني"
            type="email"
            control={control}
            errors={errors.email}
            gridProps={{ xs: 12, sm: 4 }}
          />
          <Grid xs={12} sm={4}>
            <AutocompleteField
              name="crimeType"
              label="نوع الجريمة"
              options={CRIMES}
              control={control}
              errors={errors}
            />
          </Grid>{" "}
          <TextInputField
            name="crimeLocation"
            label="مكان الجريمة"
            control={control}
            errors={errors.crimeLocation}
            gridProps={{ xs: 12, sm: 4 }}
          />
          <SelectField
            name="relation"
            label="العلاقة بالجريمة"
            options={RELATION_OPTIONS}
            control={control}
            errors={errors}
            gridProps={{ xs: 12, sm: 4 }}
          />
          <Grid xs={12} sm={4}>
            <DatePickerField
              name="crimeDate"
              label="تاريخ الجريمة"
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid xs={12}>
            <AutocompleteField
              name="responsibleParties"
              label="الأطراف المسؤولة"
              control={control}
              errors={errors}
              multiple
            />
          </Grid>
          <Grid xs={12}>
            <Controller
              name="hasCasualties"
              control={control}
              defaultValue="no"
              render={({ field, fieldState: { error } }) => (
                <FormControl
                  component="fieldset"
                  id="hasCasualties"
                  error={!!error?.message}
                >
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
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="لا"
                    />
                  </RadioGroup>{" "}
                  {error && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>{" "}
          <Grid
            xs={12}
            container
            component={"fieldset"}
            sx={{ border: "none" }}
          >
            <Grid
              xs={12}
              component={"legend"}
              color={errors[""] ? theme.palette.error.main : "inherit"}
            >
              تقدير عدد الضحايا{" "}
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
            <TextInputField
              name="victims.numberOfShohada.total"
              type="number"
              disabled={hasCasualties === "no"}
              label="عدد الشهداء"
              control={control}
              errors={errors.victims?.numberOfShohada?.total}
              gridProps={{ xs: 4 }}
            />{" "}
            <TextInputField
              name="victims.numberOfShohada.women"
              type="number"
              disabled={hasCasualties === "no"}
              label="منهم نساء"
              control={control}
              errors={errors.victims?.numberOfShohada?.women}
              gridProps={{ xs: 4 }}
            />
            <TextInputField
              name="victims.numberOfShohada.children"
              type="number"
              disabled={hasCasualties === "no"}
              label="منهم أطفال"
              control={control}
              errors={errors.victims?.numberOfShohada?.children}
              gridProps={{ xs: 4 }}
            />{" "}
            <TextInputField
              name="victims.numberOfInjured.total"
              type="number"
              disabled={hasCasualties === "no"}
              label="عدد الجرحى"
              control={control}
              errors={errors.victims?.numberOfInjured?.total}
              gridProps={{ xs: 4 }}
            />
            <TextInputField
              name="victims.numberOfInjured.women"
              type="number"
              disabled={hasCasualties === "no"}
              label="منهم نساء"
              control={control}
              errors={errors.victims?.numberOfInjured?.women}
              gridProps={{ xs: 4 }}
            />
            <TextInputField
              name="victims.numberOfInjured.children"
              type="number"
              disabled={hasCasualties === "no"}
              label="منهم أطفال"
              control={control}
              errors={errors.victims?.numberOfInjured?.children}
              gridProps={{ xs: 4 }}
            />
            <TextInputField
              name="victims.numberOfDisplaced"
              type="number"
              disabled={hasCasualties === "no"}
              label="عدد النازحين/المهجرين"
              control={control}
              errors={errors.victims?.numberOfDisplaced}
              gridProps={{ xs: 12 }}
            />{" "}
          </Grid>{" "}
          <TextInputField
            name="crimeDescription"
            multiline
            rows={4}
            label="وصف الجريمة"
            control={control}
            errors={errors.crimeDescription}
            gridProps={{ xs: 12 }}
          />
          <Grid xs={6} sm={4}>
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
                      disableElevation
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
            <FileUpload
              filePreviews={filePreviews}
              calculateColsRows={calculateColsRows}
              handleRemoveFile={handleRemoveFile}
            />
          </Grid>
          <Grid xs={12}>
            {" "}
            <CheckboxField control={control} errors={errors.termsAndPrivacy} />
          </Grid>{" "}
          <Grid xs={12}>
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              disableElevation
              sx={{ mt: 3, mb: 2 }}
            >
              إرسال البلاغ
            </Button>{" "}
            {Object.values(errors).length > 0 &&
              Object.values(errors).map((error, index) => (
                <Typography
                  color="error"
                  component="span"
                  fontSize={"0.75rem"}
                  key={index}
                >
                  {" "}
                  {index + 1} - {error.message}
                  <br />
                </Typography>
              ))}
          </Grid>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            hl="ar"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
            badge="bottomright"
          />{" "}
        </Grid>
      )}
    </Container>
  );
}
