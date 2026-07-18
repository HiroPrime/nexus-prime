import { createClient, createServiceClient } from "@/lib/supabase/server";

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
    const supabase = createServiceClient() ?? (await createClient());
    const { data, error } = await supabase
      .from("site_metrics")
      .select("total_unique_visitors")
      .eq("id", 1)
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
