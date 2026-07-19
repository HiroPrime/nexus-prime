import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    const body = await request.json();
    const questId = typeof body?.questId === "string" ? body.questId.trim() : "";

    if (!questId) {
      return NextResponse.json({ error: "questId required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.rpc("track_nexus_prime_quest", {
      p_quest_id: questId,
    });

    if (error) {
      console.error("track_nexus_prime_quest failed:", error.message);
      return NextResponse.json({ error: "Track failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("track quest error:", message);
    return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  }
}
