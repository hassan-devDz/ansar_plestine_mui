export const megaMenuItems = [
  { title: "آخر الأخبار", url: "/latest-news" },
  { title: "تحديثات القضايا", url: "/case-updates" },
  { title: "مقالات تحليلية", url: "/analytical-articles" },
  { title: "تقارير خاصة", url: "/special-reports" },
  { title: "مقابلات", url: "/interviews" },
  { title: "ملفات الفيديو والوسائط", url: "/media-files" },
  { title: "النشرة الإخبارية", url: "/newsletters" },
  { title: "الفعاليات والمؤتمرات", url: "/events-conferences" },
];

export const menuItems = [
  {
    title: "مستجدات ",
    items: megaMenuItems,
  },
  {
    title: "توثيق الجرائم",
    items: [
      { title: "تقديم بلاغات", url: "/report-crime" },
      { title: "البحث عن جرائم مسجلة", url: "/search-crimes" },
    ],
  },
  {
    title: "دعم",
    items: [
      { title: "مركز المساعدة", url: "/help-center" },
      { title: "التوجيه القانوني", url: "/legal-guidance" },
    ],
  },
  {
    title: "مراقبة",
    items: [
      { title: "تحليل البيانات", url: "/data-analysis" },
      { title: "تقارير المراقبة", url: "/monitoring-reports" },
    ],
  },
  {
    title: "تعاون",
    items: [
      { title: "منتديات للنقاش", url: "/discussion-forums" },
      { title: "شراكات مع منظمات أخرى", url: "/partnerships" },
    ],
  },
];
