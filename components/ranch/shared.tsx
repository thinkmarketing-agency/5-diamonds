import Link from "next/link";
import Image from "next/image";
import { packages, principles, faqs } from "@/lib/ranch/content";
export function Diamond() {
  return <Image src="/diamond-transparent.png" alt="" width={302} height={312} className="brandDiamond" unoptimized />;
}
export function Diamonds() {
  return (
    <span className="diamonds" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => <Diamond key={i} />)}
    </span>
  );
}
export function Intro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="pageIntro wrap">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <div className="introCopy">{children}</div>}
    </section>
  );
}
export function PackageCards() {
  return (
    <div className="packageGrid">
      {packages.map((p) => (
        <article className="packageCard" key={p.id}>
          <span className="packageFraction">{p.fraction}</span>
          <p className="eyebrow">{p.label}</p>
          <h3>{p.description}</h3>
          <p>{p.household}</p>
          <dl>
            <div>
              <dt>Packaged pounds</dt>
              <dd>{p.pounds ? `Approx. ${p.pounds} lb` : "Coming soon"}</dd>
            </div>
            <div>
              <dt>Price / packaged lb</dt>
              <dd>
                {p.pricePerPound
                  ? `$${p.pricePerPound.toFixed(2)}`
                  : "Coming soon"}
              </dd>
            </div>
            <div>
              <dt>Estimated total</dt>
              <dd>
                {p.pounds && p.pricePerPound
                  ? `$${(p.pounds * p.pricePerPound).toFixed(2)}`
                  : "Coming soon"}
              </dd>
            </div>
            <div>
              <dt>Freezer space</dt>
              <dd>{p.freezer ?? "To be confirmed"}</dd>
            </div>
          </dl>
          <Link className="textLink" href={`/beef-pricing?package=${p.id}`}>
            Explore {p.label.toLowerCase()}
          </Link>
        </article>
      ))}
    </div>
  );
}
export function Standard({ full = false }: { full?: boolean }) {
  return (
    <div className={`principles ${full ? "full" : ""}`}>
      {principles.map((p) => (
        <article key={p.title}>
          <span className="principleNumber" aria-hidden="true">
            <Diamond />
          </span>
          <h3>{p.title}</h3>
          <p>{full ? p.copy : p.short}</p>
        </article>
      ))}
    </div>
  );
}
export function PricingNote() {
  return (
    <section className="pricingNote">
      <div>
        <p className="eyebrow">A clearer way to buy beef</p>
        <h2>
          Pay for the beef
          <br />
          you take home.
        </h2>
      </div>
      <div>
        <p>
          Hanging weight is measured before trimming and cutting. Packaged
          weight is the finished beef that goes into your freezer.
        </p>
        <p>
          Our pricing uses packaged pounds, so the weight on your order
          is the weight you bring home.
        </p>
        <Link className="textLink" href="/beef-pricing">
          Understand the difference
        </Link>
      </div>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="section wrap narrow">
      <p className="eyebrow">Good questions. Straight answers.</p>
      <h2>A little more to know.</h2>
      <div className="faq">
        {faqs.map((f) => (
          <details key={f.question}>
            <summary>{f.question}</summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Callout() {
  return (
    <section className="callout wrap">
      <Diamonds />
      <h2>
        From our ranch.
        <br />
        To your table.
      </h2>
      <p>Find your fit. Get to know your beef.</p>
      <Link href="/beef-pricing" className="button">
        Explore beef & pricing
      </Link>
    </section>
  );
}
