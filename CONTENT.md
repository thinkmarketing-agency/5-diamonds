# 5 Diamonds Ranches: first-pass content guide

## Edit in one place

- `lib/ranch/content.ts`: packages, cuts, five principles, FAQs, order steps, contact options and brand details.
- `lib/ranch/recommendation.ts`: adjustable household / frequency / freezer recommendation logic. This is a planning heuristic, not a weight or capacity guarantee.
- `app/our-ranch/page.tsx`: story placeholders for the family, ranch locations, history, cattle and hay.
- `components/ranch/contact-form.tsx`: typed inquiry draft flow, ready to connect to an inquiry or reservation service later.

## Before opening reservations

1. Supply packaged pounds, packaged-pound rates, total estimates, freezer space, confirmed cut mix and quantities for each share. Null values currently display “Coming soon” or “To be confirmed” on both home and pricing pages.
2. Review every entry in `ranchClaims`. Cattle count, acreage, DNA testing, antibiotic language, confinement language, finishing options and inspection claims are deliberately held out of public copy pending verification.
3. Confirm deposits, payment terms, processor, packaging, pickup/delivery, service area and availability. Replace placeholders in `steps` and `faqs`.
4. Supply email, phone and ranch location details. The contact form currently creates a downloadable draft only; it sends nothing, stores no server record, takes no payment and makes no reservation. Add a real submission endpoint and error/success handling before changing that wording.
5. Supply final logo/cattle-brand assets. The temporary text wordmark and simple five-diamond motif do not purport to be the final cattle brand.
6. Replace family story placeholders and add owner-approved ranch photography. The original ranch image is retained. `public/beef-cut-guide.webp` is AI-generated illustrative food imagery, labeled as example cuts; it is not product photography or a package guarantee.

## Validation

- `npm run typecheck`
- `npm run lint`
- `npm test` (build plus existing render/component checks and recommendation tests)
- `npm run dev -- --host 127.0.0.1`

Cloudflare runtime declarations were generated with the installed Wrangler from `dist/server/wrangler.json`. Regenerate after runtime changes:

```sh
WRANGLER_LOG_PATH=.wrangler/wrangler.log npx wrangler types worker-runtime.d.ts --config dist/server/wrangler.json --include-env false
```

`worker-env.d.ts` declares the optional database binding used by the existing helper. Hosting bindings remain unchanged.
