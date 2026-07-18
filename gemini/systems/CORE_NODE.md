# Core Node — System Lock (CANON)

**Scope:** Public stats API + Supabase metrics for constellation integration  
**Consumers:** Core Node dashboard, sibling .nexus properties (read-only)  

---

## Public stats endpoint

**Route:** `GET /api/stats`  
**Files:** `app/api/stats/route.ts`, `lib/stats.ts`  

### Response shape (fixed)

```json
{
  "population": 2286,
  "metric": "Unique Visitors"
}
```

| Field | Rule |
|-------|------|
| `population` | Non-negative integer from `site_metrics.total_unique_visitors` |
| `metric` | Always `"Unique Visitors"` — do not rename in docs/API without lock |

### Failure behavior

- HTTP **200** with `{ "population": 0, "metric": "Unique Visitors" }`  
- Errors logged server-side — never expose stack traces publicly  

### Caching

`Cache-Control: public, s-maxage=60, stale-while-revalidate=300`  
CORS: `*` (public read)  

---

## Database

**Table:** `site_metrics`  
**Row:** `id = 1`  
**Column:** `total_unique_visitors`  

**Client:** `createServiceClient()` preferred (`SUPABASE_SERVICE_ROLE_KEY`); falls back to anon server client.

**Env vars (Vercel / local):**
- `NEXT_PUBLIC_SUPABASE_URL`  
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
- `SUPABASE_SERVICE_ROLE_KEY` (recommended for reliable reads)  

---

## Vocabulary for Gemini

| Term | Meaning |
|------|---------|
| **Population** | Marketing-friendly label for unique visitors |
| **Core Node** | Constellation layer reading stats from hub nodes |
| **Metric** | Always "Unique Visitors" in public API |

Do not invent alternate public metrics (`Active Players`, `Sessions`, etc.) without `DRAFT` label.

---

## Nexus Prime's role

Nexus Prime **hosts** the stats API — it is not required to display Population in the UI today. Core Node and other nodes may poll `/api/stats` on nexusprime.nexus.

---

## Votes (related, separate from stats)

**Table:** `portfolio_votes`  
**API:** vote routes in codebase (`lib/votes.ts`)  
**UI:** Character LOVE/HATE uses local state — full persistence UX = `DRAFT`  

When brainstorming engagement, do not conflate votes with Population.

---

## DRAFT

| Idea | Label |
|------|-------|
| On-site Population ticker in header | `DRAFT` |
| Additional metrics in `/api/stats` | `DRAFT` |
| Webhook push to Core Node | `DRAFT` |
