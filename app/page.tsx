const Diamond = ({ filled = false }: { filled?: boolean }) => (
  <span className={filled ? "diamond diamondFilled" : "diamond"} aria-hidden="true" />
);

export default function Home() {
  return (
    <main>
      <section className="hero">
        <img className="heroImage" src="/central-oregon-ranch.png" alt="Black cattle grazing beneath the Central Oregon Cascades" />
        <div className="heroShade" />
        <header className="nav shell">
          <a className="wordmark" href="#top" aria-label="Five Diamonds Ranches home"><span>5 DIAMONDS</span><small>RANCHES</small></a>
          <nav aria-label="Main navigation"><a href="#beef">Our Beef</a><a href="#ranch">The Ranch</a><a className="navCta" href="mailto:orders@centraloregonbeef.com">Reserve Beef</a></nav>
        </header>
        <div id="top" className="heroContent shell">
          <div className="eyebrow"><Diamond filled /> Five Diamonds Ranches <Diamond filled /></div>
          <h1>Central Oregon Beef.<br /><em>Raised here.</em></h1>
          <p>Honest, ranch-raised beef from our family to yours.</p>
          <div className="actions"><a className="primaryButton" href="mailto:orders@centraloregonbeef.com">Reserve Your Beef</a><a className="textLink" href="#ranch">Meet the ranch <span>→</span></a></div>
        </div>
        <div className="heroFooter shell"><span>Central Oregon</span><Diamond /><span>Ranch Raised</span><Diamond /><span>Family Operated</span></div>
      </section>
      <section id="beef" className="promise shell">
        <div className="brandPanel"><img src="/five-diamonds-logo.png" alt="Five Diamonds Ranches — Beef, Cows, Family" /></div>
        <div className="promiseCopy">
          <p className="sectionLabel">Know your rancher</p><h2>Beef with a place<br />and a name.</h2>
          <p className="lead">Raised in Central Oregon by people who care about the cattle, the land, and what ends up on your family’s table.</p>
          <div className="details"><div><strong>Local</strong><span>Born from Central Oregon roots</span></div><div><strong>Direct</strong><span>From the ranch to your freezer</span></div><div><strong>Honest</strong><span>Know where your beef comes from</span></div></div>
        </div>
      </section>
      <section id="ranch" className="reserve"><div className="shell reserveInner"><div><p className="sectionLabel light">Five Diamonds Ranches</p><h2>Fill your freezer.<br />Feed your family.</h2></div><div className="reserveAction"><p>Be the first to know when beef becomes available.</p><a className="creamButton" href="mailto:orders@centraloregonbeef.com?subject=Beef%20Availability">Ask About Availability</a></div></div></section>
      <footer className="shell footer"><div className="footerBrand">5 DIAMONDS <span>RANCHES</span></div><p>Central Oregon beef, raised with purpose.</p><p>© 2026 Five Diamonds Ranches</p></footer>
    </main>
  );
}
