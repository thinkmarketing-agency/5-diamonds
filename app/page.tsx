import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  PackageCards,
  Standard,
  PricingNote,
  Diamonds,
  Callout,
} from "@/components/ranch/shared";
import { brand } from "@/lib/ranch/content";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <Image
          unoptimized
          width={1774}
          height={887}
          priority
          className="heroImage"
          src={brand.image}
          alt="Cattle grazing in an open Oregon landscape"
        />
        <div className="heroShade" />
        <div className="heroContent wrap">
          <div className="heroDiamonds"><Diamonds /></div>
          <p className="eyebrow">5 Diamonds Ranches · Oregon</p>
          <h1>
            Oregon beef.
            <br />
            <em>Raised different.</em>
          </h1>
          <p className="heroDescription">
            Rooted in Oregon pasture. Connected to your table.
            <br />A clearer way to buy a quarter, half or whole beef.
          </p>
          <div className="actions">
            <Link href="/beef-pricing" className="button">
              View beef & pricing
            </Link>
            <Link href="/standard" className="button outline">
              The 5 Diamonds Standard
            </Link>
          </div>
          <div className="heroDiamonds heroDiamondsBottom"><Diamonds /></div>
        </div>
        <div className="heroFoot wrap">
          <span>{brand.tagline}</span>
          <span>
            RANCH DIRECT <Diamonds />
          </span>
        </div>
      </section>
      <section className="section wrap">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Good beef. Your kind of everyday.</p>
            <h2>
              A share of the ranch.
              <br />A freezer full of possibility.
            </h2>
          </div>
          <p>
            Three ways to bring Oregon beef home.
            <br />
            Priced by packaged weight: quarter $15/lb, half $13/lb, whole $10/lb.
          </p>
        </div>
        <PackageCards />
      </section>
      <div className="wrap">
        <PricingNote />
      </div>
      <section className="section standardSection wrap">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Five diamonds. One commitment.</p>
            <h2>The 5 Diamonds Standard.</h2>
          </div>
          <Link className="textLink" href="/standard">
            Get to know our standard
          </Link>
        </div>
        <Standard />
      </section>
      <section className="ranchPreview">
        <Image
          unoptimized
          width={1774}
          height={887}
          src={brand.image}
          alt="Oregon pasture and cattle beneath a wide sky"
        />
        <div>
          <p className="eyebrow">People. Pasture. Purpose.</p>
          <h2>
            Oregon roots.
            <br />A family story.
          </h2>
          <p>
            Beef, hay and family. Get to know the people and places behind 5
            Diamonds Ranches, across our Oregon ranches.
          </p>
          <Link className="textLink" href="/our-ranch">
            Meet the ranch
          </Link>
        </div>
      </section>
      <Callout />
    </main>
  );
}
