// app/api/rates/route.ts
export const revalidate = 43200; // 12 hours ✅

export async function GET() {
  try {
    // Free, no-key INR base rates
    const res = await fetch("https://open.er-api.com/v6/latest/INR", {
      // Next.js ko cache karne do (works locally & prod)
      next: { revalidate },
    });

    if (!res.ok) {
      // Upstream error – graceful fallback
      return Response.json({ rates: { INR: 1 }, base: "INR", error: "upstream" }, { status: 200 });
    }

    const data = await res.json();
    // expected: { base_code: "INR", rates: { USD: 0.012, ... } }
    return Response.json({
      base: data.base_code || "INR",
      rates: data.rates || { INR: 1 },
      updated: data.time_last_update_utc || null,
    });
  } catch (e) {
    // Network fail – still don’t break UI
    return Response.json({ base: "INR", rates: { INR: 1 }, error: "network" }, { status: 200 });
  }
}
