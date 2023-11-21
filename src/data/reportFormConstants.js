// ReportFormConstants.js
const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "الاسم مطلوب",
  ADDRESS_REQUIRED: "العنوان مطلوب",
  PHONE_REQUIRED: "رقم الهاتف مطلوب",
  PHONE_INVALID: "يجب أن يكون رقم الهاتف صالحًا",
  EMAIL_REQUIRED: "البريد الإلكتروني مطلوب",
  EMAIL_INVALID: "يجب أن يكون البريد الإلكتروني صالحًا",
  RELATION_REQUIRED: "العلاقة بالجريمة مطلوبة",
  RELATION_INVALID: "العلاقة المختارة غير صالحة",
  CRIME_DATE_INVALID: "تاريخ الجريمة غير صالح",
  CRIME_DATE_REQUIRED: "تاريخ الجريمة مطلوب",
  CRIME_LOCATION_REQUIRED: "موقع الجريمة مطلوب",
  CRIME_DESCRIPTION_REQUIRED: "وصف الجريمة مطلوب",
  CRIME_TYPE_REQUIRED: "نوع الجريمة مطلوب",
  CRIME_TYPE_INVALID: "نوع الجريمة غير صالح",
  FILE_FORMAT_UNSUPPORTED: "صيغة الملف غير مدعومة",
  FILE_REQUIRED: "يجب رفع ملف واحد على الأقل",
  TERMS_AGREEMENT_REQUIRED: "يجب الموافقة على الشروط وسياسة الخصوصية",
  // أي رسائل أخرى حسب الحاجة
};
// أي ثوابت أخرى متعلقة بالفورم

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "video/mp4",
  "video/mpeg",
  "video/quicktime", // لملفات MOV
  "video/webm", // لملفات WebM
  "video/ogg", // لملفات Ogg
];

const CRIMES = [
  {
    category: "جرائم ضد الإنسانية",
    items: [
      "الإبادة الجماعية",
      "القتل والتعذيب",
      "الاختفاء القسري",
      "التعذيب",
      "الاغتصاب والاعتداء الجنسي",
      "العبودية والاستعباد الحديث",
      "التجويع",
      "الهجمات على المدنيين",
      "استهداف الأطفال",
      "تهجير قسري",
    ],
  },
  {
    category: "جرائم حرب",
    items: [
      "استهداف المدنيين",
      "استهداف المواقع الطبية والإنسانية",
      "استخدام الأسلحة المحرمة دوليا",
      "استهداف الأطفال",
      "تطهير عرقي أو ديني",
      "التعذيب والقمع",
      "السرقة والنهب للممتلكات",
      "تجنيد واستخدام الأطفال في النزاعات",
      "معاملة الأسرى",
      "تدمير البنية التحتية",
    ],
  },
  // يمكن إضافة المزيد من الفئات والعناصر حسب الحاجة
];
const RELATION_OPTIONS = [
  "شاهد عيان",
  "ضحية",
  "صديق أو قريب للضحية",
  "معرفة ثانوية",
  "متورط جزئياً",
  "محقق أو باحث",
  "محامي أو مستشار قانوني",
  "عامل إغاثة أو إنساني",
  "ممثل منظمة غير حكومية أو دولية",
  "مسؤول حكومي أو سياسي",
  "صحفي أو إعلامي",
  "خبير أو محلل",
  "آخر",
];
export { VALIDATION_MESSAGES, SUPPORTED_FORMATS, CRIMES, RELATION_OPTIONS };
