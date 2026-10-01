import type { Metadata } from "next";
import { Intro, PricingNote, FAQ } from "@/components/ranch/shared";
import { steps } from "@/lib/ranch/content";
export const metadata: Metadata = {
  title: "How It Works",
  description:
    "A simple guide to buying quarter, half or whole beef from an Oregon ranch, from choosing your share to filling your freezer.",
  alternates: { canonical: "/how-it-works" },
};
export default function HowPage() {
  return (
    <main id="main">
      <Intro
        eyebrow="From choosing to cooking"
        title="Good beef. A simple path home."
      >
        <p>
          Here’s the planned journey. Reservation, processing and pickup details
          will be confirmed before orders open.
        </p>
      </Intro>
      <section
        className="section wrap steps"
        aria-label="Buying beef in five steps"
      >
        {steps.map((s, i) => (
          <article className="step" key={s.title}>
            <span aria-label={`Step ${i + 1}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2>{s.title}</h2>
            <p>{s.copy}</p>
          </article>
        ))}
      </section>
      <div className="wrap">
        <PricingNote />
      </div>
      <FAQ />
    </main>
  );
}
