import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const link = typeof body?.link === "string" ? body.link.trim().toLowerCase() : "";

    if (!link || !["linkedin", "x"].includes(link)) {
      return NextResponse.json({ error: "link must be linkedin or x" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.rpc("track_nexus_prime_social", {
      p_link: link,
    });

    if (error) {
      console.error("track_nexus_prime_social failed:", error.message);
      return NextResponse.json({ error: "Track failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("track social error:", message);
    return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  }
}
