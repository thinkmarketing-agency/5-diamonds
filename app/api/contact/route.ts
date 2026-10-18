import { inquirySchema, contactReady } from "@/lib/ranch/contact";
import { brand } from "@/lib/ranch/content";
export const runtime = "nodejs";
const json = (status: number, error: string) => Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return json(403, "Please send your inquiry from our contact page.");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return json(415, "Please use our contact form.");
  // Bound the actual stream, not only the untrusted Content-Length header.
  const reader = request.body?.getReader();
  if (!reader) return json(400, "Please check your inquiry.");
  let raw = "";
  let bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 32768) { await reader.cancel(); return json(413, "Your inquiry is too long."); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch { return json(400, "Please check your inquiry."); }
  let body;
  try { body = JSON.parse(raw); } catch { return json(400, "Please check your inquiry."); }
  const result = inquirySchema.safeParse(body);
  if (!result.success) return json(400, "Check all fields. A message and valid reply details are required.");
  const data = result.data;
  if (data.website) return json(400, "We could not verify this inquiry. Please email us directly.");
  if (!contactReady()) return json(503, "The form is temporarily unavailable. Please email the ranch directly.");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json",
        "Idempotency-Key": `ranch-inquiry/${data.requestId}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL, to: [brand.email], reply_to: data.email,
        subject: `Ranch inquiry: ${data.interest}`,
        text: `New website inquiry\nReference: ${data.requestId}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nInterest: ${data.interest}\nPreferred reply: ${data.method}\n\n${data.message}\n\nInquiry only; no reservation or payment.`,
      }), signal: AbortSignal.timeout(15000),
    });
    const sent = await response.json();
    if (!response.ok || !sent.id) {
      console.error("Contact email rejected", { status: response.status, reference: data.requestId });
      return json(502, "We could not send your inquiry. Your details are still here. Please retry or email the ranch directly.");
    }
    return Response.json({ ok: true, reference: data.requestId }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return json(502, "We could not confirm your inquiry was sent. Please retry or email the ranch directly.");
  }
}
