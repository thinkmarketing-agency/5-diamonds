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
  // Vector tracing of the supplied outline, mirrored to face right.
  const outline = "M62 202 Q61 195 72 190 L87 176 L100 161 Q103 153 110 146 L120 136 L114 126 Q111 116 118 121 L126 125 Q136 126 125 116 Q120 109 126 112 Q140 120 148 132 Q154 130 159 143 L182 157 Q221 159 260 170 Q288 176 309 177 L350 174 Q380 170 411 160 Q438 151 453 160 Q478 174 479 195 L479 221 L482 244 Q486 263 484 281 L485 301 Q491 317 487 329 L483 326 L484 350 L484 380 Q486 396 473 397 Q459 398 462 391 Q470 381 469 359 L463 341 Q455 353 456 370 Q456 390 448 394 Q429 398 435 387 Q449 369 444 345 Q443 326 434 319 L411 298 Q406 292 399 297 Q380 311 360 312 L331 313 Q311 307 294 310 Q276 314 256 310 Q242 306 242 317 L241 342 L235 384 Q235 397 230 397 Q213 396 218 389 L222 381 L222 358 L220 333 L216 362 L210 390 Q209 397 198 395 Q191 395 197 386 Q205 373 203 352 L199 332 Q199 323 190 321 Q180 316 175 305 L165 295 Q160 291 159 278 L153 254 L143 220 Q149 206 139 214 Q128 222 101 220 Q78 222 66 214 Q60 210 62 202 Z";
  return (
    <svg className="cowShare" viewBox="45 100 460 310" role="img" aria-label={`Right-facing cow outline filled ${share}% from left to right`}>
      <g transform="translate(550 0) scale(-1 1)">
        <defs><clipPath id={clip}><path d={outline} /></clipPath></defs>
        <path d={outline} fill="#ffffff08" />
        <g clipPath={`url(#${clip})`}>
          <rect className="cowFill" x={490 - 430 * share / 100} y="100" width={430 * share / 100} height="310" fill="currentColor" />
        </g>
        <path d={outline} fill="none" stroke="var(--cream)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M479 239 Q481 263 477 283 L477 299 Q469 290 473 263" fill="none" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
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
