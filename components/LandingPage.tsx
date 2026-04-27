"use client";

import { useState } from "react";
import { Facebook, Instagram, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import jsQR from "jsqr";
import AnimatedLogo from "./AnimatedLogo";
import { isRtl, Lang, translations } from "@/lib/i18n";
import { generateSessionId } from "@/lib/session";

async function openCamera(): Promise<string | null> {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
  });

  const video = document.createElement("video");
  video.setAttribute("playsinline", "true");
  video.srcObject = stream;
  await video.play();

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    stream.getTracks().forEach((track) => track.stop());
    return null;
  }

  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(() => {
      stream.getTracks().forEach((track) => track.stop());
      resolve(null);
    }, 12000);

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const result = jsQR(imageData.data, imageData.width, imageData.height);

        if (result?.data) {
          window.clearTimeout(timeoutId);
          stream.getTracks().forEach((track) => track.stop());
          resolve(result.data);
          return;
        }
      }
      requestAnimationFrame(scan);
    };

    requestAnimationFrame(scan);
  });
}

function extractBusIdFromQrContent(raw: string): string | null {
  if (!raw) return null;

  try {
    const asUrl = new URL(raw);
    const busFromUrl = asUrl.searchParams.get("busId") ?? asUrl.searchParams.get("bus");
    if (busFromUrl) return busFromUrl;
  } catch {
    // Non-URL payload.
  }

  const busParamMatch = raw.match(/(?:^|[?&;,\s])busId=([^&;,\s]+)/i);
  if (busParamMatch?.[1]) {
    return decodeURIComponent(busParamMatch[1]);
  }

  return raw.trim() || null;
}

function handleQRScan(rawResult: string): { busId: string; sessionId: string } | null {
  console.log("[Rater] handleQRScan() called with", rawResult);
  const busId = extractBusIdFromQrContent(rawResult);
  if (!busId) return null;
  return { busId, sessionId: generateSessionId() };
}

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.89a8.17 8.17 0 0 0 4.78 1.52V7a4.85 4.85 0 0 1-1.01-.31z" />
  </svg>
);

export default function LandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("HE");
  const t = translations[lang];
  const dir = isRtl(lang) ? "rtl" : "ltr";

  const onScanClick = async () => {
    try {
      const qrContent = await openCamera();
      if (!qrContent) {
        alert("QR scan failed. Please try again.");
        return;
      }

      const parsed = handleQRScan(qrContent);
      if (!parsed) {
        alert("QR scan failed. Please try again.");
        return;
      }

      router.push(`/report?busId=${encodeURIComponent(parsed.busId)}&sessionId=${encodeURIComponent(parsed.sessionId)}&lang=HE`);
    } catch (error) {
      console.error("[Rater] QR scan error:", error);
      alert("QR scan failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" dir={dir} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #1A3DFF, transparent)" }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #00D1C7, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-3" style={{ background: "radial-gradient(circle, #1A3DFF, transparent)" }} />
      </div>
      <header className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <AnimatedLogo />
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide hidden sm:block">{t.langLabel}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="text-sm font-semibold border-2 border-gray-100 rounded-xl px-3 py-2 bg-white cursor-pointer outline-none transition-all hover:border-blue-300 focus:border-brand-blue" style={{ color: "#1A3DFF" }}>
            <option value="HE">עברית</option>
            <option value="EN">English</option>
            <option value="AR">العربية</option>
            <option value="RU">Русский</option>
          </select>
        </div>
      </header>
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-12 text-center">
        <div className="w-full max-w-sm mx-auto space-y-8">
          <div className="space-y-3" style={{ animation: "fadeInUp 0.6s ease-out" }}>
            <h1 className="text-2xl font-bold leading-tight" style={{ background: "linear-gradient(135deg, #1A3DFF 0%, #00D1C7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t.tagline}</h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to right, transparent, #1A3DFF)" }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "#00D1C7" }} />
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to left, transparent, #1A3DFF)" }} />
            </div>
          </div>
          <div className="mx-auto w-32 h-32 rounded-3xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(26,61,255,0.08) 0%, rgba(0,209,199,0.08) 100%)", border: "2px dashed rgba(26,61,255,0.2)", animation: "float 3s ease-in-out infinite" }}>
            <QrCode size={60} style={{ color: "#1A3DFF", opacity: 0.6 }} />
          </div>
          <div className="space-y-3">
            <button
              id="scan-qr-btn"
              onClick={onScanClick}
              className="w-full text-white font-bold text-lg py-5 px-8 rounded-2xl transition-all duration-300 active:scale-95 shadow-lg"
              style={{ background: "linear-gradient(135deg, #1A3DFF 0%, #00D1C7 100%)", boxShadow: "0 8px 32px rgba(26,61,255,0.35)" }}
            >
              <span className="flex items-center justify-center gap-3">
                <QrCode size={22} />
                {t.scanBtn}
              </span>
            </button>
            <p className="text-sm text-gray-400 font-medium px-4">{t.noQrNote}</p>
          </div>
        </div>
        <div className="mt-10 w-full max-w-sm mx-auto rounded-2xl p-6 text-left" dir={dir} style={{ background: "linear-gradient(135deg, rgba(26,61,255,0.04) 0%, rgba(0,209,199,0.04) 100%)", border: "1px solid rgba(26,61,255,0.1)" }}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ background: "linear-gradient(135deg, #1A3DFF, #00D1C7)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.5" />
                <path d="M7 5v4M7 4v0.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{t.explanation}</p>
          </div>
        </div>
        <div className="mt-4 w-full max-w-sm mx-auto">
          <button
            type="button"
            onClick={() => router.push("/report?busId=demo-bus-42&sessionId=sess-abc123")}
            className="text-xs text-gray-300 hover:text-brand-teal transition-colors underline underline-offset-2"
          >
            [Dev] Open demo report page
          </button>
        </div>
      </main>
      <div className="relative z-10 flex items-center justify-center gap-4 pb-6 pt-2">
        <p className="text-xs text-gray-400 me-2">Follow us</p>
        <a href="#" aria-label="Instagram" className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95" style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", boxShadow: "0 4px 12px rgba(220,39,67,0.3)" }}>
          <Instagram size={20} color="white" />
        </a>
        <a href="#" aria-label="Facebook" className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95" style={{ background: "#1877F2", boxShadow: "0 4px 12px rgba(24,119,242,0.3)" }}>
          <Facebook size={20} color="white" />
        </a>
        <a href="#" aria-label="TikTok" className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95" style={{ background: "#010101", boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}>
          <TikTokIcon />
        </a>
      </div>
      <footer className="relative z-10 text-center py-5 px-5 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-400 tracking-wide">{t.footerTitle}</p>
        <p className="text-xs text-gray-300 mt-1">{t.footerYear}</p>
      </footer>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

export { openCamera, handleQRScan };
