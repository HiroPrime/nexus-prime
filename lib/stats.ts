import { createServiceClient } from "@/lib/supabase/server";
import { SITE_ID } from "@/lib/site-ids";

export const METRIC_LABEL = "Population";

export type PublicStats = {
  population: number;
  metric: typeof METRIC_LABEL;
};

function toPopulation(value: unknown): number {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}

export async function getPublicStats(): Promise<PublicStats> {
  const fallback: PublicStats = { population: 0, metric: METRIC_LABEL };

  try {
    const supabase = createServiceClient();
    if (!supabase) return fallback;

    const { data, error } = await supabase
      .from("site_metrics")
      .select("total_unique_visitors")
      .eq("site_id", SITE_ID)
      .maybeSingle();

    if (error) throw error;

    return {
      population: toPopulation(data?.total_unique_visitors),
      metric: METRIC_LABEL,
    };
  } catch (error) {
    console.error("getPublicStats failed:", error);
    return fallback;
  }
}
