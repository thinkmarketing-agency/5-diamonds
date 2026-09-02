export default function Home() {
  return (
    <main className="landing">
      <img
        className="ranchBackground"
        src="/central-oregon-ranch.png"
        alt="Black cattle grazing beneath the Central Oregon Cascades"
      />
      <div className="overlay" />

      <section className="brand" aria-label="Five Diamonds Ranches">
        <div className="stamp">
          <img
            className="logo"
            src="/five-diamonds-logo.png"
            alt="Five Diamonds Ranches — Beef, Cows, Family"
          />
        </div>
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
      </section>

      <footer>
        <span>Five Diamonds Ranches</span>
        <span>Central Oregon</span>
      </footer>
    </main>
  );
}
