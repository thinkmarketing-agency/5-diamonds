import type { Metadata } from "next";
import { Intro } from "@/components/ranch/shared";
import { ContactForm } from "@/components/ranch/contact-form";
import { contactReady } from "@/lib/ranch/contact";
import { brand } from "@/lib/ranch/content";
export const metadata: Metadata = {
  title: "Contact & Order",
  description:
    "Plan your quarter, half or whole Oregon beef inquiry with 5 Diamonds Ranches. Ask about availability and get a reply from the ranch.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (
    <main id="main">
      <Intro
        eyebrow="Let’s talk beef"
        title="Your next great meal starts here."
      >
        <p>
          Quarter, half or whole beef. Hay inquiries, too. Send us your questions and we’ll help you plan.
        </p>
      </Intro>
      <section className="wrap section contactGrid">
        <div>
          <ContactForm enabled={contactReady()} />
        </div>
        <aside className="contactAside">
          <p className="eyebrow">5 Diamonds Ranches</p>
          <h2>
            Oregon raised.
            <br />
            Family rooted.
          </h2>
          <dl>
            <dt>Email</dt>
            <dd>
              {brand.email ? (
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              ) : (
                "Contact details coming soon"
              )}
            </dd>
            <dt>Phone</dt>
            <dd>
              {brand.phone ? (
                <a href={`tel:${brand.phone}`}>{brand.phone}</a>
              ) : (
                "Contact details coming soon"
              )}
            </dd>
            <dt>Ranch locations</dt>
            <dd>
              Multiple Oregon ranches.
              <br />
              Location details coming soon.
            </dd>
            <dt>Pickup & service areas</dt>
            <dd>To be confirmed before reservations open.</dd>
          </dl>
          <p className="eyebrow">{brand.tagline}</p>
        </aside>
      </section>
    </main>
  );
}
