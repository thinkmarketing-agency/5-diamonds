"use client";
import { useState, useId, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Beef, CookingPot, Flame, Utensils, Snowflake } from "lucide-react";
import { packages, cuts, type PackageId } from "@/lib/ranch/content";
import { recommendPackage, type FreezerSize } from "@/lib/ranch/recommendation";
const categories = ["Steaks", "Roasts", "Ground beef", "Other cuts"];
const categoryIcons = [Beef, CookingPot, Utensils, Flame];
function Explorer() {
  const params = useSearchParams();
  const initial =
    packages.find((p) => p.id === params.get("package"))?.id ?? "quarter";
  const [selected, setSelected] = useState<PackageId>(initial);
  const [category, setCategory] = useState("Steaks");
  const [cutId, setCutId] = useState<string>("ribeye");
  const pkg = packages.find((p) => p.id === selected)!;
  const cut = cuts.find((c) => c.id === cutId)!;
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
              {p.label}
            </button>
          ))}
        </div>
        <div className="selectorBody" id={panelId}>
          <div className="shareVisual">
            <p className="eyebrow">Your share of the beef</p>
            <div className="shareNumber">
              {pkg.fraction}
              <small>{pkg.share}% SHARE</small>
            </div>
            <div
              className="shareDiagram"
              role="img"
              aria-label={`${pkg.share} percent share, shown in four equal portions`}
            >
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={i < pkg.share / 25 ? "filled" : ""}>
                  <Beef strokeWidth={1} aria-hidden="true" />
                </span>
              ))}
            </div>
            <p>
              Share illustration only.
              <br />
              Final packaged pounds will be confirmed.
            </p>
          </div>
          <div className="packageDetails" aria-live="polite" aria-atomic="true">
            <p className="eyebrow">{pkg.label} · Packaged beef</p>
            <h2>{pkg.description}</h2>
            <p className="packageFit">{pkg.household}</p>
            <dl className="stats">
              <div>
                <dt>Take-home packaged weight</dt>
                <dd>{pkg.pounds ? `${pkg.pounds} lb` : "Coming soon"}</dd>
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
              Cut mix, quantities, pricing and availability will be confirmed
              before reservations open.
            </p>
            <div className="actions">
              <Link className="button" href={`/contact?interest=${pkg.id}`}>
                Ask about {pkg.label.toLowerCase()}
              </Link>
              <a href="#cuts" className="textLink">
                Explore the cut guide
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="cuts" className="section wrap cutGuide">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">From freezer to favorite meals</p>
            <h2>What’s in your beef?</h2>
          </div>
          <p>
            A guide to familiar cuts and what to cook with them. Tap a cut to
            explore.
          </p>
        </div>
        <p className="notice">
          Example cuts for your {pkg.label.toLowerCase()} — not a confirmed
          packing list. Exact assortment and quantities are coming soon.
        </p>
        <figure className="cutAssortment">
          <Image
            src="/beef-cut-guide.webp"
            width={2164}
            height={727}
            unoptimized
            alt="Illustrative assortment of steaks, roast, ground beef, short ribs and brisket"
          />
          <figcaption>
            Illustrative example cuts. Actual assortment and appearance will
            vary.
          </figcaption>
        </figure>
        <div className="cutCategories" role="group" aria-label="Cut category">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[i];
            return (
              <button
                type="button"
                key={cat}
                aria-pressed={cat === category}
                onClick={() => {
                  setCategory(cat);
                  setCutId(cuts.find((c) => c.category === cat)!.id);
                }}
              >
                <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                {cat}
              </button>
            );
          })}
        </div>
        <div className="cutsLayout">
          <div className="cutCards">
            {cuts
              .filter((c) => c.category === category)
              .map((c) => (
                <button
                  type="button"
                  className="cutCard"
                  key={c.id}
                  aria-pressed={c.id === cutId}
                  aria-controls="cut-detail"
                  onClick={() => setCutId(c.id)}
                >
                  <span className="cutIcon">
                    <Beef size={64} strokeWidth={1} aria-hidden="true" />
                  </span>
                  <strong>{c.name}</strong>
                  <span>{c.method}</span>
                </button>
              ))}
          </div>
          <aside className="cutDetail" id="cut-detail" aria-live="polite">
            <p className="eyebrow">At your table</p>
            <h3>{cut.name}</h3>
            <dl>
              <dt>Best for</dt>
              <dd>{cut.method}</dd>
              <dt>Good for</dt>
              <dd>{cut.meal}</dd>
              <dt>Keep it simple</dt>
              <dd>{cut.preparation}</dd>
            </dl>
            <p className="smallCopy">
              Meal inspiration, not a confirmed package inclusion.
            </p>
          </aside>
        </div>
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
          <h3>{pkg.label}</h3>
          <p>{recommendation.reason}</p>
          <button
            type="button"
            className="button"
            onClick={() => onChoose(pkg.id)}
          >
            Explore {pkg.label.toLowerCase()}
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
