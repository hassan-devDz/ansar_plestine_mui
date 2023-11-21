// ReportForm.js
"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Button,
  Container,
  SvgIcon,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { createValidationSchema } from "@/validation/ValidationSchema";
import {
  CRIMES,
  SUPPORTED_FORMATS,
  RELATION_OPTIONS,
} from "@/data/reportFormConstants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ar";
export default function ReportForm() {
  const validationSchema = createValidationSchema();
  const [filePreviews, setFilePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // تحويل تاريخ الجريمة إلى التنسيق المطلوب
    console.log(data);

    // الآن يمكنك التعامل مع بيانات النموذج
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newSelectedFiles = Array.from(files);
    console.log(newSelectedFiles);
    const previews = newSelectedFiles.map((file) => ({
      src: URL.createObjectURL(file),
      type: file.type,
      alt: file.name.split(".")[0],
    }));

    setFilePreviews(previews);
    setSelectedFiles(newSelectedFiles);
  };
  const handleRemoveFile = (index) => {
    const newPreviews = [...filePreviews];
    newPreviews.splice(index, 1);
    setFilePreviews(newPreviews);

    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    // تحديث حقل الملفات في react-hook-form
    setValue("files", newSelectedFiles);
  };
  const calculateColsRows = (index) => {
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
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="الاسم"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="العنوان"
            fullWidth
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="الهاتف"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label="البريد الإلكتروني"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="relation"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.relation}>
            <InputLabel id="relation-label">العلاقة بالجريمة</InputLabel>
            <Select
              {...field}
              labelId="relation-label"
              label="العلاقة بالجريمة"
            >
              {RELATION_OPTIONS.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {errors.relation && (
              <Typography color="error" fontSize={"0.75rem"}>
                {errors.relation.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="crimeType"
        control={control}
        defaultValue={null}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            options={CRIMES.flatMap((group) =>
              group.items.map((item) => ({
                title: item,
                category: group.category,
              }))
            )}
            getOptionLabel={(option) => (option ? option.title : "")}
            groupBy={(option) => option.category}
            renderInput={(params) => (
              <TextField
                {...params}
                label="نوع الجريمة"
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            onChange={(_, data) => field.onChange(data)}
          />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
        <Controller
          name="crimeDate"
          control={control}
          defaultValue={dayjs}
          render={({ field }) => (
            <DatePicker
              label={"تاريخ الجريمة"}
              value={field.value}
              format="YYYY/MM/DD"
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.crimeDate,
                  helperText: errors.crimeDate?.message,
                },
              }}
            />
          )}
        />
      </LocalizationProvider>

      <Controller
        name="crimeLocation"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="مكان الجريمة"
            fullWidth
            error={!!errors.crimeLocation}
            helperText={errors.crimeLocation?.message}
          />
        )}
      />
      <Controller
        name="crimeDescription"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="وصف الجريمة"
            multiline
            rows={4}
            fullWidth
            error={!!errors.crimeDescription}
            helperText={errors.crimeDescription?.message}
          />
        )}
      />
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
      />
      <ImageList
        sx={{ width: 1200, maxHeight: 450, p: 2 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        
        {filePreviews.map((preview, index) => (
          <ImageListItem
            key={index}
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
                  objectFit: "cover", // cover, contain, none
                }}
              />
            ) : (
              <video
                width="200"
                height="200"
                controls
                style={{ height: "100%", width: "100%" }}
              >
                <source src={preview.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <SvgIcon
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
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
      </ImageList>
      <Controller
        name="termsAndPrivacy"
        control={control}
        defaultValue={false}
        rules={{ required: "يجب الموافقة على شروط الخدمة وسياسة الخصوصية" }}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                color={errors.termsAndPrivacy ? "error" : "primary"}
              />
            }
            label={
              <span>
                أوافق على <Link href="/terms">شروط الخدمة</Link> و
                <Link href="/privacy">سياسة الخصوصية</Link>
              </span>
            }
          />
        )}
      />
      {errors.termsAndPrivacy && (
        <Typography color="error" fontSize={"0.75rem"}>
          {errors.termsAndPrivacy.message}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        إرسال البلاغ
      </Button>
    </Container>
  );
}
