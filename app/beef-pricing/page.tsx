import type { Metadata } from "next";
import { Intro, FAQ } from "@/components/ranch/shared";
import { BeefExplorer } from "@/components/ranch/beef-explorer";
export const metadata: Metadata = {
  title: "Beef & Pricing",
  description:
    "Explore quarter, half and whole Oregon beef. Compare shares, discover cuts and learn how packaged take-home weight pricing works.",
  alternates: { canonical: "/beef-pricing" },
};
export default function BeefPricing() {
  return (
    <main id="main">
      <Intro
        eyebrow="Oregon beef · Quarter, half & whole"
        title="Pay for the beef you take home."
      >
        <p>
          Our pricing is based on finished, packaged beef — the cuts
          that fill your freezer. Explore your share below.
        </p>
      </Intro>
      <BeefExplorer />
      <section className="section wrap weightComparison">
        <div>
          <p className="eyebrow">Two weights. One important difference.</p>
          <h2>Know what your pound means.</h2>
        </div>
        <div className="comparisonGrid">
          <article>
            <span className="eyebrow">Earlier in the process</span>
            <h3>Hanging weight</h3>
            <p>
              The carcass weight before cutting and trimming. It is not the
              weight of the finished packages you receive.
            </p>
          </article>
          <article>
            <span className="eyebrow">Our pricing basis</span>
            <h3>Packaged weight</h3>
            <p>
              The finished cuts packed for your freezer. Quarter beef is $15/lb,
              half beef is $13/lb and whole beef is $10/lb. Final weight,
              processing charges and any other fees will be confirmed before ordering.
            </p>
          </article>
        </div>
      </section>
      <FAQ />
    </main>
  );
}
