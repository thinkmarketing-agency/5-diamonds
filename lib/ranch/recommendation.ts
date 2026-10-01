import type { PackageId } from "./content";
export type FreezerSize = "fridge" | "small" | "large";
/** Planning heuristic only; replace with confirmed packaged weights and usable freezer capacity. */
export function recommendPackage(
  household: number,
  frequency: number,
  freezer: FreezerSize,
): { id: PackageId; limited: boolean; reason: string } {
  const demand = household * frequency;
  const desired: PackageId =
    demand >= 20 ? "whole" : demand >= 8 ? "half" : "quarter";
  const id = freezer === "large" ? desired : "quarter";
  return {
    id,
    limited: id !== desired || freezer === "fridge",
    reason:
      freezer === "fridge"
        ? "Start by exploring a quarter, but a refrigerator freezer may be too small. Confirm packaged weight and usable freezer space before reserving."
        : freezer === "small" && desired !== "quarter"
          ? "Your meal habits suggest a larger share, but freezer space may be the limiting factor. Start with a quarter or plan more freezer space."
          : "This is a starting point based on your household and meal habits. Confirm the final package weight, assortment and freezer requirements with the ranch.",
  };
}
