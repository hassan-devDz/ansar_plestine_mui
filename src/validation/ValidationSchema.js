// ValidationSchema.js
import * as yup from "yup";
import {
  VALIDATION_MESSAGES,
  CRIMES,
  SUPPORTED_FORMATS,
  RELATION_OPTIONS,
} from "@/data/reportFormConstants";



export function createValidationSchema() {
  return yup.object().shape({
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
      .object().shape({
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
    hasCasualties: yup
      .string()
      .oneOf(["yes", "no"], "يجب اختيار إجابة صحيحة")
      .required("هذا الحقل مطلوب"),
    victims: yup.object().shape({
      typeOfStatistic: yup
        .string()
        .nullable(true)
        .oneOf(["دقيقة", "أكثر من", "تقريبة"], "يجب اختيار نوع الإحصائية"),

      numberOfShohada: yup
        .object().shape({
          total: yup
            .number()
            .typeError(VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_INVALID)
            .integer(VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_INVALID)
            .min(0, VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_INVALID)
            .required(VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_REQUIRED)
            .test(
              "totalGreaterThanWomenAndChildren",
              "مجموع عدد النساء والأطفال يجب ألا يتجاوز العدد الإجمالي للشهداء",
              function (value) {
                const { women, children } = this.parent;
                if (value >= 0 && women >= 0 && children >= 0) {
                  return value >= (women || 0) + (children || 0);
                }
                return true;
              }
            ),
          women: yup
            .number()
            .typeError(VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_WOMEN_INVALID)
            .integer(VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_WOMEN_INVALID)
            .min(0, VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_WOMEN_INVALID)
            .required(VALIDATION_MESSAGES.NUMBER_OF_INJURED_WOMEN_REQUIRED)
            .test(
              "womenLessThanTotalMinusChildren",
              "عدد النساء يجب ألا يتجاوز العدد الإجمالي للشهداء مطروحًا منه عدد الأطفال",
              function (value) {
                const { total, children } = this.parent;
                if (value >= 0 && total >= 0 && children >= 0) {
                  return value <= (total || 0) - (children || 0);
                }
                return true;
              }
            ),
          children: yup
            .number()
            .typeError(VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_CHILDREN_INVALID)
            .integer(VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_CHILDREN_INVALID)
            .min(0, VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_CHILDREN_INVALID)
            .test(
              "childrenLessThanTotalMinusWomen",
              "عدد الأطفال يجب ألا يتجاوز العدد الإجمالي للشهداء مطروحًا منه عدد النساء",
              function (value) {
                const { total, women } = this.parent;
                if (value >= 0 && women >= 0 && total >= 0) {
                  return value <= (total || 0) - (women || 0);
                }
                return true;
              }
            )
            .required(VALIDATION_MESSAGES.NUMBER_OF_SHOHADA_CHILDREN_REQUIRED),
        })
        .required(),
      numberOfInjured: yup
        .object().shape({
          total: yup
            .number()
            .typeError(VALIDATION_MESSAGES.NUMBER_OF_INJURED_INVALID)
            .integer(VALIDATION_MESSAGES.NUMBER_OF_INJURED_INVALID)
            .min(0, VALIDATION_MESSAGES.NUMBER_OF_INJURED_INVALID)
            .required(VALIDATION_MESSAGES.NUMBER_OF_INJURED_REQUIRED)
            .test(
              "totalGreaterThanWomenAndChildren",
              VALIDATION_MESSAGES.TOTAL_INJURED_CHECK,
              function (value) {
                const { women, children } = this.parent;
                if (value >= 0 && women >= 0 && children >= 0) {
                  return value >= (women || 0) + (children || 0);
                }
                return true;
              }
            ),
          women: yup
            .number()
            .typeError(VALIDATION_MESSAGES.NUMBER_OF_INJURED_WOMEN_INVALID)
            .integer(VALIDATION_MESSAGES.NUMBER_OF_INJURED_WOMEN_INVALID)
            .min(0, VALIDATION_MESSAGES.NUMBER_OF_INJURED_WOMEN_INVALID)
            .required(VALIDATION_MESSAGES.NUMBER_OF_INJURED_WOMEN_REQUIRED)
            .test(
              "womenLessThanTotalMinusChildren",
              "عدد النساء يجب ألا يتجاوز العدد الإجمالي للجرحى مطروحًا منه عدد الأطفال",
              function (value) {
                const { total, children } = this.parent;
                if (value >= 0 && total >= 0 && children >= 0) {
                  return value <= (total || 0) - (children || 0);
                }
                return true;
              }
            ),
          children: yup
            .number()
            .typeError(VALIDATION_MESSAGES.NUMBER_OF_INJURED_CHILDREN_INVALID)
            .integer(VALIDATION_MESSAGES.NUMBER_OF_INJURED_CHILDREN_INVALID)
            .min(0, VALIDATION_MESSAGES.NUMBER_OF_INJURED_CHILDREN_INVALID)
            .test(
              "childrenLessThanTotalMinusWomen",
              "عدد الأطفال يجب ألا يتجاوز العدد الإجمالي للجرحى مطروحًا منه عدد النساء",
              function (value) {
                const { total, women } = this.parent;
                if (value >= 0 && women >= 0 && total >= 0) {
                  return value <= (total || 0) - (women || 0);
                }
                return true;
              }
            )
            .required(VALIDATION_MESSAGES.NUMBER_OF_INJURED_CHILDREN_REQUIRED),
        })
        .required(),

      numberOfDisplaced: yup
        .number()
        .typeError(VALIDATION_MESSAGES.NUMBER_OF_DISPLACED_INVALID)
        .integer(VALIDATION_MESSAGES.NUMBER_OF_DISPLACED_INVALID)
        .min(0, VALIDATION_MESSAGES.NUMBER_OF_DISPLACED_INVALIDD)
        .required(VALIDATION_MESSAGES.NUMBER_OF_DISPLACED_REQUIRED),
    }),
    responsibleParties: yup
      .array()
      .of(yup.string().required(VALIDATION_MESSAGES.NAME_REQUIRED))
      .min(1, "يجب إدخال اسم واحد على الأقل"),
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
