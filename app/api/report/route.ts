import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const busId = String(formData.get("busId") ?? "");
    const sessionId = String(formData.get("sessionId") ?? "");
    const category = String(formData.get("category") ?? "");
    const description = String(formData.get("description") ?? "");
    const lang = String(formData.get("lang") ?? "HE");
    const timestamp = formData.get("timestamp");
    const timestampValue = typeof timestamp === "string" && timestamp.trim() ? timestamp : new Date().toISOString();

    if (!busId || !sessionId || !category || !description || !lang) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const parsedTimestamp = new Date(timestampValue);
    if (Number.isNaN(parsedTimestamp.getTime())) {
      return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
    }

    const photoFile = formData.get("photoFile");
    const videoFile = formData.get("videoFile");

    let photoUrl: string | null = null;
    let videoUrl: string | null = null;

    if (photoFile instanceof File && photoFile.size > 0) {
      const photoBlob = await put(`reports/${busId}/${sessionId}/photo-${Date.now()}-${photoFile.name}`, photoFile, {
        access: "public",
      });
      photoUrl = photoBlob.url;
    }

    if (videoFile instanceof File && videoFile.size > 0) {
      const videoBlob = await put(`reports/${busId}/${sessionId}/video-${Date.now()}-${videoFile.name}`, videoFile, {
        access: "public",
      });
      videoUrl = videoBlob.url;
    }

    await db.report.create({
      data: {
        busId,
        sessionId,
        category,
        description,
        lang,
        timestamp: parsedTimestamp,
        photoUrl,
        videoUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/report] failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
