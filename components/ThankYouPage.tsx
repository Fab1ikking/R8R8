"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isRtl, Lang, translations } from "@/lib/i18n";

interface Props {
  initialLang?: Lang;
}

export default function ThankYouPage({ initialLang = "HE" }: Props) {
  const router = useRouter();
  const [lang] = useState<Lang>(initialLang);
  const [countdown, setCountdown] = useState(3);
  const [circleProgress, setCircleProgress] = useState(0);
  const [checkVisible, setCheckVisible] = useState(false);
  const t = translations[lang];
  const dir = isRtl(lang) ? "rtl" : "ltr";

  useEffect(() => {
    const timer = setTimeout(() => setCheckVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000;
    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCircleProgress(progress);
      setCountdown(Math.max(0, Math.ceil((duration - elapsed) / 1000)));
      if (progress >= 1) {
        clearInterval(tick);
        router.push("/");
      }
    }, 50);

    return () => clearInterval(tick);
  }, [router]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - circleProgress);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between py-12 px-5" dir={dir} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #00D1C7, transparent)" }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #1A3DFF, transparent)" }} />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              background: i % 2 === 0 ? "#1A3DFF" : "#00D1C7",
              top: `${15 + i * 14}%`,
              left: `${10 + i * 15}%`,
              animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      <div />
      <div className="relative z-10 flex flex-col items-center text-center max-w-xs mx-auto space-y-8">
        <div className="relative flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 100 100" className="absolute" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(26,61,255,0.1)" strokeWidth="4" />
            <circle cx="50" cy="50" r={radius} fill="none" stroke="url(#progressGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} style={{ transition: "stroke-dashoffset 0.05s linear" }} />
            <defs>
              <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1A3DFF" />
                <stop offset="100%" stopColor="#00D1C7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500" style={{ background: "linear-gradient(135deg, #1A3DFF 0%, #00D1C7 100%)", boxShadow: checkVisible ? "0 12px 40px rgba(26,61,255,0.4), 0 0 0 12px rgba(0,209,199,0.1)" : "none", transform: checkVisible ? "scale(1)" : "scale(0.5)", opacity: checkVisible ? 1 : 0 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ opacity: checkVisible ? 1 : 0, transition: "opacity 0.3s ease 0.3s" }}>
              <path d="M10 20 L17 27 L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset={checkVisible ? "0" : "40"} style={{ transition: "stroke-dashoffset 0.5s ease 0.4s" }} />
            </svg>
          </div>
        </div>
        <div className="space-y-3" style={{ opacity: checkVisible ? 1 : 0, transform: checkVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.3s" }}>
          <h1 className="text-3xl font-black" style={{ background: "linear-gradient(135deg, #1A3DFF 0%, #00D1C7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t.thankYouTitle}</h1>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">{t.thankYouMsg}</p>
        </div>
        <div className="rounded-2xl px-5 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, rgba(26,61,255,0.06) 0%, rgba(0,209,199,0.06) 100%)", border: "1px solid rgba(26,61,255,0.12)", opacity: checkVisible ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-base" style={{ background: "linear-gradient(135deg, #1A3DFF, #00D1C7)" }}>
            {countdown}
          </div>
          <p className="text-sm text-gray-500">{t.redirectMsg}</p>
        </div>
        <button onClick={() => router.push("/")} className="w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-200 active:scale-95" style={{ background: "linear-gradient(135deg, #1A3DFF 0%, #00D1C7 100%)", boxShadow: "0 8px 24px rgba(26,61,255,0.3)", opacity: checkVisible ? 1 : 0, transition: "all 0.5s ease 0.6s" }}>
          {t.backBtn}
        </button>
      </div>
      <footer className="relative z-10 text-center">
        <p className="text-xs text-gray-300">Rater — Passenger Experience AI System</p>
        <p className="text-xs text-gray-200 mt-1">© 2026</p>
      </footer>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
