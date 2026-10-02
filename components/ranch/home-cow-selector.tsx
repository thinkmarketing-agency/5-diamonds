"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { packages, type PackageId } from "@/lib/ranch/content";
import { cowLabels } from "@/lib/ranch/cow-shares";
import { CowShare } from "./cow-share";

export function HomeCowSelector() {
  const [selected, setSelected] = useState<PackageId>("quarter");
  const panelId = useId();
  const pkg = packages.find((p) => p.id === selected)!;
  const money = (amount: number) => amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return (
    <div className="homeCowSelector">
      <div className="packageTabs" role="group" aria-label="Choose your cow share">
        {packages.map((p) => (
          <button key={p.id} type="button" aria-pressed={selected === p.id} aria-controls={panelId} onClick={() => setSelected(p.id)}>
            {p.id === "quarter" ? "¼ Cow" : p.id === "half" ? "½ Cow" : "Full Cow"}
          </button>
        ))}
      </div>
      <div className="homeCowBody" id={panelId}>
        <div className="shareVisual"><CowShare share={pkg.share} /></div>
        <div className="homeCowDetails">
          <dl className="stats" aria-live="polite" aria-atomic="true" aria-label={cowLabels[pkg.id]}>
            <div><dt>Packaged pounds</dt><dd>{pkg.pounds ? `Approx. ${pkg.pounds} lb` : "To be confirmed"}</dd></div>
            <div><dt>Price per packaged pound</dt><dd>{pkg.pricePerPound ? `${money(pkg.pricePerPound)}/lb` : "To be confirmed"}</dd></div>
            <div><dt>Estimated total</dt><dd>{pkg.pounds && pkg.pricePerPound ? money(pkg.pounds * pkg.pricePerPound) : "To be confirmed"}</dd></div>
          </dl>
          <Link className="textLink" href={`/beef-pricing?package=${pkg.id}`}>View {cowLabels[pkg.id].toLowerCase()} details</Link>
        </div>
      </div>
    </div>
  );
}
