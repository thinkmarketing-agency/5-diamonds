export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Five Diamonds Ranches",
    url: "https://fivediamondsranches.com",
    image: "https://fivediamondsranches.com/central-oregon-ranch.png",
    description:
      "Five Diamonds Ranches is preparing a Central Oregon beef offering rooted in ranch-raised cattle, family stewardship, and local land.",
    areaServed: {
      "@type": "Place",
      name: "Central Oregon",
    },
    brand: {
      "@type": "Brand",
      name: "Five Diamonds Ranches",
    },
    sameAs: ["https://centraloregonbeef.com"],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="landing">
        <img
          className="ranchBackground"
          src="/central-oregon-ranch.png"
          alt="Black cattle grazing beneath the Central Oregon Cascades"
        />
        <div className="overlay" />

        <div className="brand" aria-label="Five Diamonds Ranches">
          <h1 className="srOnly">Five Diamonds Ranches Central Oregon Beef</h1>
          <img
            className="logo"
            src="/five-diamonds-logo-transparent.png"
            alt="Five Diamonds Ranches — Beef, Cows, Family"
          />
          <div className="domainLine">
            <span className="diamond" aria-hidden="true" />
            <p>Central</p>
            <span className="diamond" aria-hidden="true" />
            <p>Oregon</p>
            <span className="diamond" aria-hidden="true" />
            <p>Beef</p>
            <span className="diamond" aria-hidden="true" />
          </div>
          <p className="comingSoon">Coming soon</p>
        </div>

        <footer>
          <span>Five Diamonds Ranches</span>
          <span>Central Oregon</span>
        </footer>
      </section>

      <section className="seoPanel" aria-labelledby="ranch-story">
        <div className="seoInner">
          <p className="eyebrow">Ranch-raised beef in Central Oregon</p>
          <h2 id="ranch-story">Five Diamonds Ranches is preparing a local beef offering.</h2>
          <p>
            Five Diamonds Ranches is building a home for Central Oregon beef:
            ranch-raised cattle, family stewardship, and a direct connection to
            the land behind every cut.
          </p>
          <div className="seoGrid">
            <article>
              <h3>Local Beef</h3>
              <p>
                A Central Oregon beef brand focused on ranch-raised quality,
                clear sourcing, and a straightforward way to learn when orders open.
              </p>
            </article>
            <article>
              <h3>Family Ranch</h3>
              <p>
                Five Diamonds Ranches centers the essentials: beef, cows, family,
                open country, and practical care for the herd.
              </p>
            </article>
            <article>
              <h3>Coming Soon</h3>
              <p>
                This page is the official preview for Five Diamonds Ranches and
                CentralOregonBeef.com while the full ranch site is prepared.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
