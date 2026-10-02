import { type PackageId } from "./content";

export const cowLabels: Record<PackageId, string> = {
  quarter: "1/4 Cow", half: "1/2 Cow", whole: "Full Cow",
};
const groups = [
  { name: "Steaks", pounds: [90, 110], cuts: [[16, 24, "ribeyes"], [16, 24, "New York strips"], [8, 12, "T-bones"], [4, 8, "sirloins"], [2, 2, "flank steaks"], [2, 2, "skirt steaks"]] },
  { name: "Roasts", pounds: [70, 100], cuts: [[6, 10, "chuck roasts"], [2, 4, "rump roasts"], [2, 4, "arm roasts"], [2, 2, "sirloin tip roasts"], [2, 2, "eye of round roasts"]] },
  { name: "Ground beef", pounds: [160, 240], cuts: [] },
  { name: "Specialty cuts", pounds: [50, 70], cuts: [[2, 2, "briskets"]] },
] as const;
const number = (n: number) => n === 0.5 ? '½' : String(n).replace('.5', '½');
export function cowAssortment(id: PackageId) {
  const scale = id === "whole" ? 1 : id === "half" ? 0.5 : 0.25;
  return groups.map((group) => ({
    name: group.name,
    weight: `${group.pounds[0] * scale}–${group.pounds[1] * scale} lb`,
    items: [
      ...group.cuts.map(([low, high, name]) => {
        const min = low * scale, max = high * scale;
        const count = min === max ? number(min) : `${number(min)}–${number(max)}`;
        return `${count} ${name}${!Number.isInteger(min) || !Number.isInteger(max) ? " (portion equivalents)" : ""}`;
      }),
      ...(group.name === "Ground beef" ? ["Packaged ground beef"] : []),
      ...(group.name === "Specialty cuts" ? ["Short ribs", "Oxtail allocation varies"] : []),
    ],
  }));
}
