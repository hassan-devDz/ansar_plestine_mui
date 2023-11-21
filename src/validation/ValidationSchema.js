// ValidationSchema.js
import * as yup from "yup";
import {
  VALIDATION_MESSAGES,
  CRIMES,
  SUPPORTED_FORMATS,
  RELATION_OPTIONS,
} from "@/data/reportFormConstants";

// تعريف دالة مخصصة للتحقق من تنسيق التاريخ

export function createValidationSchema() {
  return yup.object({
    name: yup.string().required(VALIDATION_MESSAGES.NAME_REQUIRED),
    address: yup.string().required(VALIDATION_MESSAGES.ADDRESS_REQUIRED),
    phone: yup
      .string()
      .matches(/^[+]?[0-9]{10,15}$/, VALIDATION_MESSAGES.PHONE_INVALID)
      .required(VALIDATION_MESSAGES.PHONE_REQUIRED),
    email: yup
      .string()
      .email(VALIDATION_MESSAGES.EMAIL_INVALID)
      .required(VALIDATION_MESSAGES.EMAIL_REQUIRED),
    relation: yup
      .string()
      .required(VALIDATION_MESSAGES.RELATION_REQUIRED)
      .oneOf(RELATION_OPTIONS, VALIDATION_MESSAGES.RELATION_INVALID),
    crimeDate: yup
      .date()
      .typeError(VALIDATION_MESSAGES.CRIME_DATE_INVALID)
      .required(VALIDATION_MESSAGES.CRIME_DATE_REQUIRED),
    crimeLocation: yup
      .string()
      .required(VALIDATION_MESSAGES.CRIME_LOCATION_REQUIRED),
    crimeDescription: yup
      .string()
      .required(VALIDATION_MESSAGES.CRIME_DESCRIPTION_REQUIRED),
    crimeType: yup
      .object({
        title: yup.string().required(VALIDATION_MESSAGES.CRIME_TYPE_REQUIRED),
        category: yup
          .string()
          .required(VALIDATION_MESSAGES.CRIME_TYPE_REQUIRED),
      })
      .test(
        "isValidCrimeType",
        VALIDATION_MESSAGES.CRIME_TYPE_INVALID,
        (value) =>
          CRIMES.some(
            (category) =>
              category.category === value.category &&
              category.items.includes(value.title)
          )
      )
      .required(VALIDATION_MESSAGES.CRIME_TYPE_REQUIRED),
    files: yup
      .mixed()

      .test(
        "fileFormat",
        VALIDATION_MESSAGES.FILE_FORMAT_UNSUPPORTED,
        function (files) {
          if (!files || files.length === 0) return true; // تأكد من أن الملفات موجودة وليست فارغة

          const filesArray = Array.from(files); // تحويل FileList إلى مصفوفة
          const invalidFile = filesArray.find(
            (file) => !SUPPORTED_FORMATS.includes(file.type)
          );

          if (invalidFile) {
            return this.createError({
              message: ` ${VALIDATION_MESSAGES.FILE_FORMAT_UNSUPPORTED} ${invalidFile.name}`,
            });
          }
          return true;
        }
      )
      .test(
        "files",
        VALIDATION_MESSAGES.FILE_REQUIRED,
        (value) => value && value.length > 0
      ),
    termsAndPrivacy: yup
      .boolean()
      .oneOf([true], VALIDATION_MESSAGES.TERMS_AGREEMENT_REQUIRED),

    // يمكن إضافة المزيد من الحقول حسب الحاجة
  });
}

// export const validationSchema = yup
//   .object({
//     name: yup.string().required(VALIDATION_MESSAGES.NAME_REQUIRED),
//     address: yup.string().required(VALIDATION_MESSAGES.ADDRESS_REQUIRED),
//     phone: yup
//       .string()
//       .matches(/^[+]?[0-9]{10,15}$/, VALIDATION_MESSAGES.PHONE_INVALID)
//       .required(VALIDATION_MESSAGES.PHONE_REQUIRED),
//     email: yup
//       .string()
//       .email(VALIDATION_MESSAGES.EMAIL_INVALID)
//       .required(VALIDATION_MESSAGES.EMAIL_REQUIRED),
//     relation: yup
//       .string()
//       .required(VALIDATION_MESSAGES.RELATION_REQUIRED)
//       .oneOf(RELATION_OPTIONS, VALIDATION_MESSAGES.RELATION_INVALID),
//     crimeDate: yup
//       .date()
//       .typeError(VALIDATION_MESSAGES.CRIME_DATE_INVALID)
//       .required(VALIDATION_MESSAGES.CRIME_DATE_REQUIRED),
//     crimeLocation: yup
//       .string()
//       .required(VALIDATION_MESSAGES.CRIME_LOCATION_REQUIRED),
//     crimeDescription: yup
//       .string()
//       .required(VALIDATION_MESSAGES.CRIME_DESCRIPTION_REQUIRED),
//     crimeType: yup
//       .object({
//         title: yup.string().required(VALIDATION_MESSAGES.CRIME_TYPE_REQUIRED),
//         category: yup
//           .string()
//           .required(VALIDATION_MESSAGES.CRIME_TYPE_REQUIRED),
//       })
//       .test(
//         "isValidCrimeType",
//         VALIDATION_MESSAGES.CRIME_TYPE_INVALID,
//         (value) =>
//           CRIMES.some(
//             (category) =>
//               category.category === value.category &&
//               category.items.includes(value.title)
//           )
//       )
//       .required(VALIDATION_MESSAGES.CRIME_TYPE_REQUIRED),
//     files: yup
//       .mixed()

//       .test(
//         "fileFormat",
//         VALIDATION_MESSAGES.FILE_FORMAT_UNSUPPORTED,
//         function (files) {
//           if (!files || files.length === 0) return true; // تأكد من أن الملفات موجودة وليست فارغة

//           const filesArray = Array.from(files); // تحويل FileList إلى مصفوفة
//           const invalidFile = filesArray.find(
//             (file) => !SUPPORTED_FORMATS.includes(file.type)
//           );

//           if (invalidFile) {
//             return this.createError({
//               message: ` ${VALIDATION_MESSAGES.FILE_FORMAT_UNSUPPORTED} ${invalidFile.name}`,
//             });
//           }
//           return true;
//         }
//       )
//       .test(
//         "files",
//         VALIDATION_MESSAGES.FILE_REQUIRED,
//         (value) => value && value.length > 0
//       ),
//     termsAndPrivacy: yup
//       .boolean()
//       .oneOf([true], VALIDATION_MESSAGES.TERMS_AGREEMENT_REQUIRED),

//     // يمكن إضافة المزيد من الحقول حسب الحاجة
//   })
//   .required();
