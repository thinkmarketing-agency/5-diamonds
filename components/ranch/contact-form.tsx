"use client";
import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { interestOptions } from "@/lib/ranch/content";
type Inquiry = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  method: string;
  message: string;
};
function InquiryForm() {
  const params = useSearchParams();
  const initial = interestOptions.some(
    (o) => o.value === params.get("interest"),
  )
    ? params.get("interest")!
    : "quarter";
  const [method, setMethod] = useState("email");
  const [draft, setDraft] = useState<Inquiry | null>(null);
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setDraft(Object.fromEntries(data.entries()) as Inquiry);
  }
  function download() {
    if (!draft) return;
    const text = `5 Diamonds Ranches — inquiry draft\nNot submitted to the ranch.\n\n${Object.entries(
      draft,
    )
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "5-diamonds-inquiry.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <div className="notice">
        Online inquiries and reservations are not open yet. You can prepare and
        download an inquiry below; it will not be sent to the ranch.
      </div>
      <form
        className="inquiryForm"
        onSubmit={prepare}
        onChange={() => setDraft(null)}
      >
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
            maxLength={5000}
            placeholder="Tell us what you’re looking for, and any questions you have."
          />
        </label>
        <p className="smallCopy">
          This draft stays in this page until you download it. No payment is
          collected and no beef is reserved.
        </p>
        <button className="button" type="submit">
          Prepare inquiry draft
        </button>
      </form>
      {draft && (
        <section className="draftResult" aria-live="polite">
          <h3>Your draft is ready.</h3>
          <p>
            It has not been sent. Download a copy to keep until ranch contact
            details are available.
          </p>
          <dl>
            <dt>Interested in</dt>
            <dd>
              {interestOptions.find((o) => o.value === draft.interest)?.label}
            </dd>
            <dt>Preferred contact</dt>
            <dd>{draft.method}</dd>
          </dl>
          <button type="button" className="button outline" onClick={download}>
            Download inquiry draft
          </button>
        </section>
      )}
    </>
  );
}
export function ContactForm() {
  return (
    <Suspense fallback={<p>Loading inquiry form…</p>}>
      <InquiryForm />
    </Suspense>
  );
}
