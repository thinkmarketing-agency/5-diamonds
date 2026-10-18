import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
function load(path, overrides = {}) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', code)((name) => overrides[name] ?? require(name), compiled, compiled.exports);
  return compiled.exports;
}
const contact = load('../lib/ranch/contact.ts');
const { POST } = load('../app/api/contact/route.ts', { '@/lib/ranch/contact': contact, '@/lib/ranch/content': { brand: { email: '5diamondranches@gmail.com' } } });
const valid = { name: 'Test Visitor', email: 'visitor@example.com', phone: '', interest: 'hay', method: 'email', message: 'Test inquiry', website: '', requestId: '97bcaeda-5e39-4384-865a-a941758280ee' };
const request = (body = valid, origin = 'https://www.fivediamondsranches.com') => new Request('https://www.fivediamondsranches.com/api/contact', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) });
test('validation rejects invalid replies, oversized messages and invalid interests', () => {
  for (const patch of [{ email: 'bad' }, { method: 'text', phone: '' }, { message: '' }, { message: 'x'.repeat(5001) }, { interest: 'invalid' }]) assert.equal(contact.inquirySchema.safeParse({ ...valid, ...patch }).success, false);
  assert.equal(contact.inquirySchema.safeParse(valid).success, true);
});
test('contact delivery fails closed, rejects honeypot and preserves fixed recipient', async () => {
  const originalFetch = globalThis.fetch;
  const keys = ['RESEND_API_KEY','CONTACT_FROM_EMAIL'];
  const old = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  try {
    keys.forEach(k => delete process.env[k]);
    assert.equal((await POST(request())).status, 503);
    assert.equal((await POST(request(valid, 'https://evil.example'))).status, 403);
    assert.equal((await POST(request({ ...valid, message: 'x'.repeat(40000) }))).status, 413);
    keys.forEach(k => process.env[k] = 'test-only');
    let calls = [];
    let deliveryStatus = 200;
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      return Response.json(deliveryStatus === 200 ? { id: 'mock-id' } : { error: 'rejected' }, { status: deliveryStatus });
    };
    assert.equal((await POST(request({ ...valid, website: 'spam' }))).status, 400);
    assert.equal(calls.length, 0);
    assert.equal((await POST(request())).status, 200);
    const sent = JSON.parse(calls[0].init.body);
    assert.deepEqual(sent.to, ['5diamondranches@gmail.com']);
    assert.equal(sent.reply_to, valid.email);
    assert.match(sent.text, /Test inquiry/);
    assert.equal(calls[0].init.headers['Idempotency-Key'], `ranch-inquiry/${valid.requestId}`);
    deliveryStatus = 429;
    assert.equal((await POST(request())).status, 502);
    globalThis.fetch = async () => { throw new Error('timeout'); };
    assert.equal((await POST(request())).status, 502);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of keys) { if (old[key] === undefined) delete process.env[key]; else process.env[key] = old[key]; }
  }
});
