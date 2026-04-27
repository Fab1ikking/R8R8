"use client";

import { useRef, useState } from "react";
import { AlertCircle, ArrowLeft, ChevronDown, Image, QrCode, Send, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import AnimatedLogo from "./AnimatedLogo";
import { isRtl, Lang, translations } from "@/lib/i18n";

interface ReportPayload {
  busId: string;
  sessionId: string;
  category: string;
  description: string;
  photoFile?: File | null;
  videoFile?: File | null;
  lang: Lang;
}

async function submitReport(payload: ReportPayload) {
  console.log("[Rater] submitReport() called with payload:", payload);
  const formData = new FormData();
  formData.append("busId", payload.busId);
  formData.append("sessionId", payload.sessionId);
  formData.append("category", payload.category);
  formData.append("description", payload.description);
  formData.append("lang", payload.lang);
  if (payload.photoFile) formData.append("photoFile", payload.photoFile);
  if (payload.videoFile) formData.append("videoFile", payload.videoFile);

  const response = await fetch("/api/report", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Report submission failed");
  }
}

interface Props {
  busId?: string;
  sessionId?: string;
  initialLang?: Lang;
}

export default function ReportPage({ busId, sessionId, initialLang = "HE" }: Props) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>(initialLang);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];
  const dir = isRtl(lang) ? "rtl" : "ltr";
  const hasSession = Boolean(busId && sessionId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !description.trim() || !busId || !sessionId) return;
    setIsSubmitting(true);

    try {
      await submitReport({
        busId,
        sessionId,
        category,
        description,
        photoFile,
        videoFile,
        lang,
      });
      router.push(`/thankyou?lang=${lang}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasSession) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 text-center" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #1A3DFF, transparent)" }} />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #00D1C7, transparent)" }} />
        </div>
        <div className="relative z-10 max-w-xs mx-auto space-y-6">
          <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(26,61,255,0.1) 0%, rgba(0,209,199,0.1) 100%)", border: "2px solid rgba(26,61,255,0.2)" }}>
            <AlertCircle size={40} style={{ color: "#1A3DFF" }} />
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800">{lang === "HE" ? "גישה נדחתה" : lang === "AR" ? "تم رفض الوصول" : lang === "RU" ? "Доступ запрещён" : "Access Denied"}</h2>
            <p className="text-gray-500 leading-relaxed">{t.noQrAccess}</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, rgba(26,61,255,0.05) 0%, rgba(0,209,199,0.05) 100%)", border: "1px solid rgba(26,61,255,0.1)" }}>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <QrCode size={16} style={{ color: "#1A3DFF" }} />
              <span>{lang === "HE" ? "יש לסרוק את הברקוד בלבד" : "Please scan the QR code on the bus"}</span>
            </div>
          </div>
          <button onClick={() => router.push("/")} className="w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-200 active:scale-95" style={{ background: "linear-gradient(135deg, #1A3DFF 0%, #00D1C7 100%)", boxShadow: "0 8px 24px rgba(26,61,255,0.3)" }}>
            <span className="flex items-center justify-center gap-2">
              <ArrowLeft size={18} />
              {lang === "HE" ? "חזרה לדף הראשי" : lang === "AR" ? "العودة للرئيسية" : lang === "RU" ? "На главную" : "Back to Home"}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" dir={dir} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #1A3DFF, transparent)" }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #00D1C7, transparent)" }} />
      </div>
      <header className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <button onClick={() => router.push("/")} className="p-2 rounded-xl text-gray-400 hover:text-brand-blue hover:bg-gray-50 transition-all">
          <ArrowLeft size={20} />
        </button>
        <AnimatedLogo />
        <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="text-sm font-semibold border-2 border-gray-100 rounded-xl px-3 py-2 bg-white cursor-pointer outline-none" style={{ color: "#1A3DFF" }}>
          <option value="HE">עברית</option>
          <option value="EN">English</option>
          <option value="AR">العربية</option>
          <option value="RU">Русский</option>
        </select>
      </header>
      <div className="relative z-10 px-5 pt-5">
        <div className="max-w-sm mx-auto rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, rgba(26,61,255,0.08) 0%, rgba(0,209,199,0.08) 100%)", border: "1px solid rgba(26,61,255,0.15)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #1A3DFF, #00D1C7)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="4" width="12" height="9" rx="2" stroke="white" strokeWidth="1.5" />
              <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="white" strokeWidth="1.5" />
              <circle cx="5.5" cy="13" r="1" fill="white" />
              <circle cx="10.5" cy="13" r="1" fill="white" />
              <path d="M2 8h12" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400">Bus ID</p>
            <p className="text-sm font-bold" style={{ color: "#1A3DFF" }}>{busId}</p>
          </div>
          <div className="ms-auto">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-600 font-medium">Verified QR</span>
            </div>
          </div>
        </div>
      </div>
      <main className="relative z-10 flex-1 px-5 py-6">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-5">
          <h1 className="text-2xl font-bold text-gray-900 text-center">{t.reportTitle}</h1>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{t.categoryLabel}</label>
            <div className="relative">
              <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full appearance-none rounded-2xl border-2 border-gray-100 px-4 py-4 text-sm font-medium bg-white outline-none cursor-pointer transition-all focus:border-blue-400" style={{ color: category ? "#1a1a1a" : "#9ca3af" }}>
                <option value="" disabled>{lang === "HE" ? "בחר קטגוריה" : "Select category"}</option>
                {t.categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" style={{ [isRtl(lang) ? "left" : "right"]: "16px" }} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{t.descLabel}</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t.descPlaceholder} required rows={5} className="w-full rounded-2xl border-2 border-gray-100 px-4 py-4 text-sm bg-white outline-none resize-none transition-all focus:border-blue-400 placeholder-gray-300" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input ref={photoRef} type="file" accept="image/*" className="hidden" id="photo-upload" onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)} />
              <button type="button" onClick={() => photoRef.current?.click()} className="w-full py-4 px-3 rounded-2xl border-2 border-dashed text-sm font-medium transition-all duration-200 active:scale-95 flex flex-col items-center gap-2" style={{ borderColor: photoFile ? "#00D1C7" : "#e5e7eb", color: photoFile ? "#00A89F" : "#9ca3af", background: photoFile ? "rgba(0,209,199,0.05)" : "white" }}>
                <Image size={20} />
                <span className="truncate w-full text-center">{photoFile ? photoFile.name : t.photoBtn}</span>
              </button>
            </div>
            <div>
              <input ref={videoRef} type="file" accept="video/*" className="hidden" id="video-upload" onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)} />
              <button type="button" onClick={() => videoRef.current?.click()} className="w-full py-4 px-3 rounded-2xl border-2 border-dashed text-sm font-medium transition-all duration-200 active:scale-95 flex flex-col items-center gap-2" style={{ borderColor: videoFile ? "#00D1C7" : "#e5e7eb", color: videoFile ? "#00A89F" : "#9ca3af", background: videoFile ? "rgba(0,209,199,0.05)" : "white" }}>
                <Video size={20} />
                <span className="truncate w-full text-center">{videoFile ? videoFile.name : t.videoBtn}</span>
              </button>
            </div>
          </div>
          <button id="submit-report-btn" type="submit" disabled={isSubmitting || !category || !description.trim()} className="w-full text-white font-bold text-lg py-5 px-8 rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: "linear-gradient(135deg, #1A3DFF 0%, #00D1C7 100%)", boxShadow: "0 8px 32px rgba(26,61,255,0.35)" }}>
            <span className="flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  {lang === "HE" ? "שולח..." : "Sending..."}
                </>
              ) : (
                <>
                  <Send size={20} />
                  {t.submitBtn}
                </>
              )}
            </span>
          </button>
        </form>
      </main>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </div>
  );
}

export { submitReport };
