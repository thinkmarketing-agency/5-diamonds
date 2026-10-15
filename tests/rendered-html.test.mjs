import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));

test("Next.js production serves all ranch pages and their local assets", { timeout: 60000 }, async () => {
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const { port } = reservation.address();
  await new Promise((resolve) => reservation.close(resolve));

  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
  let output = "";
  server.stdout.on("data", (chunk) => { output += chunk; });
  server.stderr.on("data", (chunk) => { output += chunk; });
  const base = `http://127.0.0.1:${port}`;
  try {
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      assert.equal(server.exitCode, null, output);
      try {
        const response = await fetch(base, { signal: AbortSignal.timeout(1000) });
        if (response.ok) { ready = true; break; }
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    assert.ok(ready, `Production server did not start: ${output}`);
    const assets = new Set();
    for (const route of ["/", "/beef-pricing", "/contact", "/how-it-works", "/our-ranch", "/standard"]) {
      const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(10000) });
      assert.equal(response.status, 200, route);
      assert.match(response.headers.get("content-type"), /text\/html/);
      const html = await response.text();
      assert.match(html, /5 Diamonds Ranches/, route);
      assert.match(html, /<main\b/, route);
      assert.doesNotMatch(html, /\/_vinext\//, route);
      for (const match of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) {
        const url = match[1].replaceAll("&amp;", "&");
        if (/\.(?:css|js|png|webp|svg|jpg|jpeg)(?:\?|$)|^\/_next\/image\?/.test(url)) assets.add(url);
      }
    }
    assert.ok([...assets].some((asset) => asset.endsWith(".css")), "Emits production CSS");
    for (const asset of assets) {
      const response = await fetch(`${base}${asset}`, { signal: AbortSignal.timeout(10000) });
      assert.equal(response.status, 200, asset);
    }
    assert.equal((await fetch(`${base}/this-page-does-not-exist`)).status, 404);
  } finally {
    const exited = once(server, "exit");
    server.kill("SIGTERM");
    const forceExit = setTimeout(() => server.kill("SIGKILL"), 3000);
    try { await exited; } finally { clearTimeout(forceExit); }
  }
});
