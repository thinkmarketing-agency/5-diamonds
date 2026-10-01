import test from "node:test";
import assert from "node:assert/strict";
import ts from "typescript";
import { readFileSync } from "node:fs";
const source = readFileSync(
  new URL("../lib/ranch/recommendation.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
});
const { recommendPackage } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
test("household demand yields quarter, half and whole starting points", () => {
  assert.equal(recommendPackage(2, 1, "large").id, "quarter");
  assert.equal(recommendPackage(4, 2, "large").id, "half");
  assert.equal(recommendPackage(6, 4, "large").id, "whole");
});
test("limited freezer space never recommends a larger share without a caveat", () => {
  for (const freezer of ["fridge", "small"]) {
    const result = recommendPackage(6, 4, freezer);
    assert.equal(result.id, "quarter");
    assert.equal(result.limited, true);
    assert.match(result.reason, /freezer/i);
  }
  assert.equal(recommendPackage(2, 1, "fridge").limited, true);
});
