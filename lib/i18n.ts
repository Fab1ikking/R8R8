export type Lang = "HE" | "EN" | "AR" | "RU";

export interface Translations {
  tagline: string;
  scanBtn: string;
  noQrNote: string;
  explanation: string;
  langLabel: string;
  footerTitle: string;
  footerYear: string;
  reportTitle: string;
  noQrAccess: string;
  categoryLabel: string;
  categories: string[];
  descLabel: string;
  descPlaceholder: string;
  photoBtn: string;
  videoBtn: string;
  submitBtn: string;
  thankYouTitle: string;
  thankYouMsg: string;
  backBtn: string;
  redirectMsg: string;
}

export const translations: Record<Lang, Translations> = {
  HE: {
    tagline: "דיווח אנונימי על חוויית הנסיעה שלך",
    scanBtn: "סרוק ברקוד / Scan QR Code",
    noQrNote: "אין אפשרות לדיווח ללא סריקת ברקוד",
    explanation:
      "Rater מאפשר לך לדווח בצורה אנונימית על חוויית הנסיעה — איחורים, ניקיון, נהג, עומס, או אפילו לפרגן. לאחר סריקת הברקוד תוכל לצרף תמונה או סרטון.",
    langLabel: "שפה",
    footerTitle: "Rater — Passenger Experience AI System",
    footerYear: "© 2026",
    reportTitle: "שלח דיווח",
    noQrAccess: "יש להיכנס דרך סריקת ברקוד בלבד",
    categoryLabel: "קטגוריה",
    categories: ["איחור / Delay", "ניקיון / Cleanliness", "נהג / Driver behavior", "עומס / Crowding", "פרגון / Positive feedback", "אחר / Other"],
    descLabel: "תאר את החוויה שלך",
    descPlaceholder: "ספר לנו מה קרה...",
    photoBtn: "צרף תמונה",
    videoBtn: "צרף סרטון",
    submitBtn: "שלח דיווח / Submit Report",
    thankYouTitle: "תודה!",
    thankYouMsg: "הדיווח שלך התקבל בהצלחה.",
    backBtn: "חזרה לדף הראשי",
    redirectMsg: "מועבר לדף הראשי בעוד 3 שניות...",
  },
  EN: {
    tagline: "Anonymous feedback about your ride",
    scanBtn: "Scan QR Code / סרוק ברקוד",
    noQrNote: "Reporting is only available after scanning the QR code",
    explanation:
      "Rater lets you anonymously report your ride experience — delays, cleanliness, driver behavior, crowding, or positive feedback. After scanning the QR code, you can attach a photo or video.",
    langLabel: "Language",
    footerTitle: "Rater — Passenger Experience AI System",
    footerYear: "© 2026",
    reportTitle: "Submit Report",
    noQrAccess: "Please access this page only through QR scan",
    categoryLabel: "Category",
    categories: ["Delay / איחור", "Cleanliness / ניקיון", "Driver behavior / נהג", "Crowding / עומס", "Positive feedback / פרגון", "Other / אחר"],
    descLabel: "Describe your experience",
    descPlaceholder: "Tell us what happened...",
    photoBtn: "Attach Photo",
    videoBtn: "Attach Video",
    submitBtn: "Submit Report / שלח דיווח",
    thankYouTitle: "Thank you!",
    thankYouMsg: "Your report has been submitted successfully.",
    backBtn: "Back to Home",
    redirectMsg: "Redirecting to home in 3 seconds...",
  },
  AR: {
    tagline: "ملاحظاتك عن الرحلة بشكل مجهول",
    scanBtn: "امسح رمز QR",
    noQrNote: "لا يمكن تقديم التقارير إلا بعد مسح رمز QR",
    explanation:
      "يتيح لك Rater الإبلاغ بشكل مجهول عن تجربة رحلتك — التأخيرات، النظافة، سلوك السائق، الازدحام، أو ملاحظات إيجابية. بعد مسح رمز QR، يمكنك إرفاق صورة أو فيديو.",
    langLabel: "اللغة",
    footerTitle: "Rater — نظام الذكاء الاصطناعي لتجربة الركاب",
    footerYear: "© 2026",
    reportTitle: "إرسال تقرير",
    noQrAccess: "يرجى الدخول إلى هذه الصفحة عبر مسح رمز QR فقط",
    categoryLabel: "الفئة",
    categories: ["تأخير", "نظافة", "سلوك السائق", "الازدحام", "ملاحظات إيجابية", "أخرى"],
    descLabel: "صف تجربتك",
    descPlaceholder: "أخبرنا بما حدث...",
    photoBtn: "إرفاق صورة",
    videoBtn: "إرفاق فيديو",
    submitBtn: "إرسال التقرير",
    thankYouTitle: "شكراً!",
    thankYouMsg: "تم استلام تقريرك بنجاح.",
    backBtn: "العودة للصفحة الرئيسية",
    redirectMsg: "سيتم التوجيه إلى الصفحة الرئيسية خلال 3 ثوانٍ...",
  },
  RU: {
    tagline: "Анонимный отзыв о вашей поездке",
    scanBtn: "Сканировать QR-код",
    noQrNote: "Отчёт доступен только после сканирования QR-кода",
    explanation:
      "Rater позволяет вам анонимно сообщать о своём опыте поездки — задержки, чистота, поведение водителя, переполненность или положительный отзыв. После сканирования QR-кода можно прикрепить фото или видео.",
    langLabel: "Язык",
    footerTitle: "Rater — AI-система впечатлений пассажиров",
    footerYear: "© 2026",
    reportTitle: "Отправить отчёт",
    noQrAccess: "Пожалуйста, открывайте эту страницу только через сканирование QR-кода",
    categoryLabel: "Категория",
    categories: ["Задержка", "Чистота", "Поведение водителя", "Переполненность", "Положительный отзыв", "Другое"],
    descLabel: "Опишите ваш опыт",
    descPlaceholder: "Расскажите нам, что произошло...",
    photoBtn: "Прикрепить фото",
    videoBtn: "Прикрепить видео",
    submitBtn: "Отправить отчёт",
    thankYouTitle: "Спасибо!",
    thankYouMsg: "Ваш отчёт успешно отправлен.",
    backBtn: "Вернуться на главную",
    redirectMsg: "Перенаправление на главную через 3 секунды...",
  },
};

export const rtlLangs: Lang[] = ["HE", "AR"];
export const isRtl = (lang: Lang) => rtlLangs.includes(lang);
