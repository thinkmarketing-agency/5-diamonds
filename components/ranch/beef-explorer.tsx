"use client";
import { useState, useId, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Snowflake } from "lucide-react";
import { packages, type PackageId } from "@/lib/ranch/content";
import { recommendPackage, type FreezerSize } from "@/lib/ranch/recommendation";
import { cowLabels, cowAssortment } from "@/lib/ranch/cow-shares";

function CowShare({ share }: { share: number }) {
  const clip = useId();
  const outline = "M65 85 C95 65 135 70 165 76 L260 75 Q282 75 296 63 L316 42 L332 47 L341 39 L338 58 L355 69 L379 91 Q391 104 380 116 L352 121 L331 110 L318 130 L305 156 L301 212 L283 212 L278 166 L270 154 Q233 174 188 165 L172 212 L153 212 L160 164 L145 152 L125 168 L116 212 L98 212 L100 161 L83 142 L79 208 L61 208 L63 128 Q52 110 65 85 Z";
  return (
    <svg className="cowShare" viewBox="25 25 390 205" role="img" aria-label={`Cow outline filled to ${share}%`}>
      <defs><clipPath id={clip}><path d={outline} /></clipPath></defs>
      <path d={outline} fill="#ffffff08" />
      <g clipPath={`url(#${clip})`}>
        <rect className="cowFill" x="25" y={212 - 173 * share / 100} width="390" height={173 * share / 100} fill="currentColor" />
      </g>
      <path d={outline} fill="none" stroke="var(--cream)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M66 86 Q44 89 45 119 L42 149 M39 145 L46 145 L46 160 L39 160 Z M319 68 L307 58 M345 84 L348 84 M353 108 L377 106" fill="none" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function Explorer() {
  const params = useSearchParams();
  const initial =
    packages.find((p) => p.id === params.get("package"))?.id ?? "quarter";
  const [selected, setSelected] = useState<PackageId>(initial);
  const pkg = packages.find((p) => p.id === selected)!;
  const panelId = useId();
  function selectPackage(id: PackageId) {
    setSelected(id);
    const url = new URL(window.location.href);
    url.searchParams.set("package", id);
    window.history.replaceState(null, "", url);
  }
  return (
    <>
      <section className="wrap beefSelector" aria-label="Explore beef packages">
        <div
          className="packageTabs"
          role="group"
          aria-label="Choose your beef share"
        >
          {packages.map((p) => (
            <button
              type="button"
              key={p.id}
              aria-pressed={selected === p.id}
              aria-controls={panelId}
              onClick={() => selectPackage(p.id)}
            >
              {cowLabels[p.id]}
            </button>
          ))}
        </div>
        <div className="selectorBody" id={panelId}>
          <div className="shareVisual">
            <p className="eyebrow">Your share of the cow</p>
            <div className="shareNumber">
              {pkg.fraction}
              <small>{pkg.share}% SHARE</small>
            </div>
            <CowShare share={pkg.share} />
            <p>
              Share illustration only.
              <br />
              Final packaged pounds will be confirmed.
            </p>
          </div>
          <div className="packageDetails" aria-live="polite" aria-atomic="true">
            <p className="eyebrow">{cowLabels[pkg.id]} · Packaged beef</p>
            <h2>{pkg.description}</h2>
            <p className="packageFit">{pkg.household}</p>
            <dl className="stats">
              <div>
                <dt>Take-home packaged weight</dt>
                <dd>{pkg.pounds ? `Approx. ${pkg.pounds} lb` : "Coming soon"}</dd>
              </div>
              <div>
                <dt>Price per packaged pound</dt>
                <dd>
                  {pkg.pricePerPound
                    ? `$${pkg.pricePerPound.toFixed(2)}`
                    : "Coming soon"}
                </dd>
              </div>
              <div>
                <dt>Approximate total</dt>
                <dd>
                  {pkg.pounds && pkg.pricePerPound
                    ? `$${(pkg.pounds * pkg.pricePerPound).toFixed(2)}`
                    : "Coming soon"}
                </dd>
              </div>
              <div>
                <dt>Freezer space</dt>
                <dd>{pkg.freezer ?? "To be confirmed"}</dd>
              </div>
            </dl>
            <p className="smallCopy">
              Estimates use approximate packaged weights. Final weight, cut mix,
              processing charges, any other fees and availability will be confirmed before ordering.
            </p>
            <div className="actions">
              <Link className="button" href={`/contact?interest=${pkg.id}`}>
                Ask about {cowLabels[pkg.id].toLowerCase()}
              </Link>
              <a href="#assortment" className="textLink">
                See your estimated cuts
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="assortment" className="section wrap shareAssortment" aria-labelledby="assortment-title" aria-live="polite">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Your estimated assortment</p>
            <h2 id="assortment-title">Inside your {cowLabels[pkg.id].toLowerCase()}.</h2>
          </div>
          <p>{pkg.share === 100 ? "The ranch’s full-cow estimates." : `Estimated at ${pkg.share}% of the ranch’s full-cow cut list.`} Actual weights and portions vary.</p>
        </div>
        <div className="assortmentGrid">
          {cowAssortment(selected).map((group) => (
            <article key={group.name}>
              <p className="eyebrow">{group.weight}</p>
              <h3>{group.name}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
          <article>
            <p className="eyebrow">Allocation varies</p>
            <h3>Extras</h3>
            <ul>{["Soup bones", "Tallow", "Heart", "Liver", "Tongue", "Kidneys"].map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
        <p className="smallCopy">Planning estimates, not guaranteed counts. Fractional cuts represent portion equivalents; the butcher will confirm the actual allocation, including specialty cuts and extras. Category ranges are approximate and may not add up to your estimated packaged weight.</p>
      </section>
      <Recommendation
        onChoose={(id) => {
          selectPackage(id);
          document
            .querySelector(".beefSelector")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </>
  );
}
function Recommendation({ onChoose }: { onChoose: (id: PackageId) => void }) {
  const [household, setHousehold] = useState(2);
  const [frequency, setFrequency] = useState(2);
  const [freezer, setFreezer] = useState<FreezerSize>("small");
  const recommendation = recommendPackage(household, frequency, freezer);
  const pkg = packages.find((p) => p.id === recommendation.id)!;
  return (
    <section className="recommendation">
      <div className="wrap recommendationGrid">
        <div>
          <p className="eyebrow">Find your starting point</p>
          <h2>
            How much beef
            <br />
            do I need?
          </h2>
          <p className="recommendationIntro">
            A few everyday details can help narrow it down.
          </p>
          <div className="recommendationControls">
            <label>
              Household size
              <select
                value={household}
                onChange={(e) => setHousehold(Number(e.target.value))}
              >
                {[2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n === 6 ? "6+" : n} people
                  </option>
                ))}
              </select>
            </label>
            <label>
              How often do you eat beef?
              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
              >
                <option value={1}>Occasionally</option>
                <option value={2}>1–2 times a week</option>
                <option value={3}>3–4 times a week</option>
                <option value={4}>Frequently</option>
              </select>
            </label>
            <label>
              Available freezer space
              <select
                value={freezer}
                onChange={(e) => setFreezer(e.target.value as FreezerSize)}
              >
                <option value="fridge">Refrigerator freezer</option>
                <option value="small">Small chest freezer</option>
                <option value="large">Large freezer</option>
              </select>
            </label>
          </div>
        </div>
        <div className="recommendationResult" aria-live="polite">
          <Snowflake size={32} strokeWidth={1} aria-hidden="true" />
          <p className="eyebrow">Start by exploring</p>
          <h3>{cowLabels[pkg.id]}</h3>
          <p>{recommendation.reason}</p>
          <button
            type="button"
            className="button"
            onClick={() => onChoose(pkg.id)}
          >
            Explore {cowLabels[pkg.id].toLowerCase()}
          </button>
          <p className="smallCopy">
            A planning guide only. Package weights and freezer estimates are
            still being finalized.
          </p>
        </div>
      </div>
    </section>
  );
}
export function BeefExplorer() {
  return (
    <Suspense fallback={<p className="wrap">Loading your beef guide…</p>}>
      <Explorer />
    </Suspense>
  );
}
