"use client";
import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { interestOptions } from "@/lib/ranch/content";
import { useEffect, useRef } from "react";
import { brand } from "@/lib/ranch/content";
function InquiryForm({ enabled }: { enabled: boolean }) {
  const params = useSearchParams();
  const initial = interestOptions.some((o) => o.value === params.get("interest")) ? params.get("interest")! : "quarter";
  const [method, setMethod] = useState("email");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const attempt = useRef<{ payload: string; id: string } | null>(null);
  useEffect(() => { if (status === "success" || error) result.current?.focus(); }, [status, error]);
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    const payload = JSON.stringify(fields);
    if (attempt.current?.payload !== payload) attempt.current = { payload, id: crypto.randomUUID() };
    setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, requestId: attempt.current!.id }),
        signal: AbortSignal.timeout(30000),
      });
      const body = await response.json();
      if (!response.ok || body.ok !== true) throw new Error(body.error || "We could not send your inquiry. Please retry or email us directly.");
      setStatus("success"); form.reset(); setMethod("email"); attempt.current = null;
    } catch (err) {
      setStatus("idle"); setError(err instanceof Error && err.name !== "TimeoutError" ? err.message : "We could not confirm your inquiry was sent. Please retry or email us directly.");
    }
  }
  return (
    <>
      <p className="notice">Ask about availability, beef shares or hay. This is an inquiry; no payment is collected and no beef is reserved.</p>
      <p>Prefer email? <a className="textLink" href={`mailto:${brand.email}`}>{brand.email}</a></p>
      {!enabled && <p role="status">The online form is being connected. Please email the ranch directly.</p>}
      <form className="inquiryForm" onSubmit={send} aria-busy={status === "sending"}>
        <fieldset disabled={!enabled || status === "sending" || status === "success"} className="inquiryFields">
        <div className="formTrap" aria-hidden="true">
          <label>Leave this blank<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <div className="formRow">
          <label>
            Name
            <input name="name" autoComplete="name" required maxLength={120} />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
        </div>
        <div className="formRow">
          <label>
            Phone {method === "email" ? "(optional)" : ""}
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required={method !== "email"}
              maxLength={40}
            />
          </label>
          <label>
            I’m interested in
            <select name="interest" defaultValue={initial}>
              {interestOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <fieldset>
          <legend>Preferred contact method</legend>
          <div className="radioChoices">
            {["email", "phone", "text"].map((m) => (
              <label key={m}>
                <input
                  name="method"
                  type="radio"
                  value={m}
                  checked={method === m}
                  onChange={() => setMethod(m)}
                />
                {m === "text"
                  ? "Text message"
                  : m[0].toUpperCase() + m.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>
        <label>
          Message
          <textarea
            name="message"
            rows={5}
            required
            maxLength={5000}
            placeholder="Tell us what you’re looking for, and any questions you have."
          />
        </label>
        <p className="smallCopy">We use your details to respond to this inquiry. They are sent through our email service and checked for spam. Please don’t include payment details.</p>
        </fieldset>
        <button className="button" type="submit" disabled={!enabled || status === "sending" || status === "success"}>
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <noscript>Please enable JavaScript to use the form, or email the ranch directly using the link above.</noscript>
      </form>
      <div ref={result} tabIndex={-1} role={error ? "alert" : "status"} aria-live="polite" className="contactResult">
        {error && <p>{error} <a href={`mailto:${brand.email}`}>Email {brand.email}</a></p>}
        {status === "success" && <><h3>Your inquiry has been sent.</h3><p>Thanks for contacting 5 Diamonds Ranches. We’ll reply using your preferred contact method. Your beef is not reserved yet.</p><button className="button outline" type="button" onClick={() => setStatus("idle")}>Send another inquiry</button></>}
      </div>
    </>
  );
}
export function ContactForm({ enabled }: { enabled: boolean }) {
  return <Suspense fallback={<p>Email <a href={`mailto:${brand.email}`}>{brand.email}</a> while the inquiry form loads.</p>}><InquiryForm enabled={enabled} /></Suspense>;
}
