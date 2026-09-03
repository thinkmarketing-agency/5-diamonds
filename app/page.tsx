export default function Home() {
  const structuredData = [
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Five Diamonds Ranches",
      url: "https://fivediamondsranches.com",
      creator: {
        "@type": "Organization",
        name: "Think Marketing",
        url: "https://thinkmarketingbend.com",
      },
    },
  ];

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

        <header className="siteHeader" aria-label="Five Diamonds Ranches">
          <a className="headerBrand" href="/" aria-label="Five Diamonds Ranches home">
            <img
              src="/five-diamonds-logo-transparent.png"
              alt=""
              aria-hidden="true"
            />
            <span>Five Diamonds Ranches</span>
          </a>
          <span className="headerLocation">Central <span className="wordDiamond" aria-hidden="true" /> Oregon <span className="wordDiamond" aria-hidden="true" /> Beef</span>
        </header>

        <div className="brand" aria-label="Five Diamonds Ranches">
          <h1 className="srOnly">Five Diamonds Ranches Central Oregon Beef</h1>
          <img
            className="logo"
            src="/five-diamonds-logo-transparent.png"
            alt="Five Diamonds Ranches — Beef, Cows, Family"
          />
          <p className="domainLine">Central <span className="wordDiamond" aria-hidden="true" /> Oregon <span className="wordDiamond" aria-hidden="true" /> Beef</p>
          <p className="comingSoon">Coming soon</p>
        </div>

        <a
          className="thinkMark"
          href="https://thinkmarketingbend.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Built by Think Marketing"
        >
          <img src="/think-marketing-logo-transparent.png" alt="" aria-hidden="true" />
        </a>

      </section>
    </main>
  );
}
