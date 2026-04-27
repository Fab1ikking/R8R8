"use server";

import { db } from "@/lib/db";

interface ReportActionPayload {
  busId: string;
  sessionId: string;
  category: string;
  description: string;
  lang: string;
}

export async function submitReportAction(payload: ReportActionPayload) {
  if (!payload.busId || !payload.sessionId || !payload.category || !payload.description) {
    throw new Error("Missing required report fields");
  }

  // Placeholder server action path for production workflows.
  await db.report.create({
    data: {
      busId: payload.busId,
      sessionId: payload.sessionId,
      category: payload.category,
      description: payload.description,
      lang: payload.lang,
    },
  });

  return { ok: true };
}
