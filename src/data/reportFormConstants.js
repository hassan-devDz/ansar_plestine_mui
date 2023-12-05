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
  NUMBER_OF_SHOHADA_REQUIRED: "عدد الشهداء مطلوب",
  NUMBER_OF_SHOHADA_INVALID: "عدد الشهداء غير صالح",
  NUMBER_OF_SHOHADA_WOMEN_INVALID:
    "عدد النساء من بين الشهداء يجب أن يكون رقمًا",
  NUMBER_OF_SHOHADA_WOMEN_REQUIRED: "عدد النساء من بين الشهداء مطلوب",
  NUMBER_OF_SHOHADA_CHILDREN_INVALID:
    "عدد الأطفال من بين الشهداء يجب أن يكون رقمًا",
  NUMBER_OF_SHOHADA_CHILDREN_REQUIRED: "عدد الأطفال من بين الشهداء مطلوب",
  TOTAL_SHOHADA_CHECK:
    "مجموع عدد النساء والأطفال يجب ألا يتجاوز العدد الإجمالي للشهداء",

  NUMBER_OF_INJURED_REQUIRED: "عدد الجرحى مطلوب",
  NUMBER_OF_INJURED_INVALID: "عدد الجرحى غير صالح",
  NUMBER_OF_INJURED_WOMEN_INVALID: "عدد النساء من بين الجرحى يجب أن يكون رقمًا",
  NUMBER_OF_INJURED_WOMEN_REQUIRED: "عدد النساء من بين الجرحى مطلوب",
  NUMBER_OF_INJURED_CHILDREN_INVALID:
    "عدد الأطفال من بين الجرحى يجب أن يكون رقمًا",
  NUMBER_OF_INJURED_CHILDREN_REQUIRED: "عدد الأطفال من بين الجرحى مطلوب",
  TOTAL_INJURED_CHECK:
    "مجموع عدد النساء والأطفال يجب ألا يتجاوز العدد الإجمالي للجرحى",
  NUMBER_OF_DISPLACED_REQUIRED: "عدد النازحين/المهجرين مطلوب",
  NUMBER_OF_DISPLACED_INVALID: "عدد النازحين/المهجرين غير صالح",

  STATISTICS_REQUIRED:"نوع الاحصائية مطلوب",
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
