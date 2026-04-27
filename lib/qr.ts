import { generateSessionId } from "./session";

export interface ParsedQrResult {
  busId: string;
  sessionId: string;
}

export function parseQrResult(raw: string): ParsedQrResult | null {
  if (!raw || typeof raw !== "string") return null;

  try {
    const asUrl = new URL(raw);
    const busId = asUrl.searchParams.get("busId") ?? asUrl.searchParams.get("bus") ?? "";
    const sessionId = asUrl.searchParams.get("sessionId") ?? asUrl.searchParams.get("session") ?? generateSessionId();
    if (!busId) return null;
    return { busId, sessionId };
  } catch {
    const [busId, sessionId] = raw.split(":");
    if (!busId) return null;
    return { busId, sessionId: sessionId || generateSessionId() };
  }
}
