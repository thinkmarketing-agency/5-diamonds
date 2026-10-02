import type { Metadata } from "next";
import { Intro, Standard, Callout, Diamonds } from "@/components/ranch/shared";
export const metadata: Metadata = {
  title: "The 5 Diamonds Standard",
  description:
    "Five principles behind 5 Diamonds Ranches: pasture, connection, animal care, choice and clear packaged-weight pricing.",
  alternates: { canonical: "/standard" },
};
export default function StandardPage() {
  return (
    <main id="main" className="standardPage">
      <Intro
        eyebrow="Five diamonds. One commitment."
        title="The 5 Diamonds Standard."
      >
        <p>
          A closer connection to the land, the cattle and the beef you bring
          home.
        </p>
      </Intro>
      <div className="standardBanner wrap">
        <Diamonds />
        <p>ROOM TO ROAM. A REASON TO TRUST.</p>
      </div>
      <section className="wrap section standardPrinciples">
        <Standard full />
      </section>
      <Callout />
    </main>
  );
}
