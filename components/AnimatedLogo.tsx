"use client";

import { useEffect, useState } from "react";

const LETTERS = ["R", "a", "t", "e", "r"];

export default function AnimatedLogo() {
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setActiveIdx(idx % LETTERS.length);
      idx++;
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center select-none">
      <div className="relative flex items-center gap-0.5">
        <div
          className="mr-2 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #1A3DFF 0%, #00D1C7 100%)",
            boxShadow: "0 4px 20px rgba(26,61,255,0.35)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" />
            <path d="M7 11h8M11 7l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="text-4xl font-black tracking-tight transition-all duration-200"
            style={{
              transform: activeIdx === i ? "translateY(-6px)" : "translateY(0)",
              background: activeIdx === i ? "linear-gradient(135deg, #00D1C7, #1A3DFF)" : "linear-gradient(135deg, #1A3DFF, #1A3DFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
              lineHeight: 1,
              filter: activeIdx === i ? "drop-shadow(0 4px 8px rgba(0,209,199,0.5))" : "none",
            }}
          >
            {letter}
          </span>
        ))}
        <span
          className="ml-1 w-2 h-2 rounded-full self-start mt-2"
          style={{
            background: "#00D1C7",
            boxShadow: "0 0 8px 3px rgba(0,209,199,0.6)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}
