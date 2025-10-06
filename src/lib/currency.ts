// lib/currency.ts
export type Rates = Record<string, number>;

export async function getRates(): Promise<Rates> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/rates`, { cache: "force-cache" });
  const json = await res.json();
  return json.rates as Rates;
}

export function convertFromINR(amountINR: number, toCurrency: string, rates: Rates) {
  if (!rates?.[toCurrency]) return amountINR; // fallback
  return amountINR * rates[toCurrency]; // base INR hai
}

export function formatCurrency(amount: number, currency: string, locale = "en-US") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}
