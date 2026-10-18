"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, brand } from "@/lib/ranch/content";
import Image from "next/image";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="siteHeader">
      <Link
        href="/"
        className="wordmark logoBrand"
        aria-label="5 Diamonds Ranches home"
        onClick={() => setOpen(false)}
      >
        <Image
          src="/brand-mark-clean.png"
          alt=""
          width={620}
          height={315}
          className="headerLogo"
          unoptimized
          priority
        />
        <span className="headerIdentity" aria-hidden="true">
          <span className="headerName">5 DIAMONDS</span>
          <span className="headerRanches">RANCHES</span>
          <Image src="/cows-clean.png" alt="" width={700} height={185} className="headerCows" unoptimized priority />
          <span className="headerTagline">BEEF • HAY • FAMILY</span>
        </span>
      </Link>
      <button
        type="button"
        className="menuToggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="primary-nav"
        aria-label="Main navigation"
        className={open ? "open" : ""}
      >
        {navigation.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            aria-current={path === n.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="button compact"
          onClick={() => setOpen(false)}
        >
          Ask about availability
        </Link>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer wrap">
      <div>
        <Link className="footerBrand" href="/">
          {brand.name}
        </Link>
        <p className="eyebrow">{brand.tagline}</p>
        <p>Oregon beef. A direct connection.</p>
      </div>
      <nav aria-label="Footer navigation">
        {navigation.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
        <Link href="/contact?interest=hay">Ask about hay</Link>
      </nav>
      <p className="footerBottom">
        © {new Date().getFullYear()} {brand.name}
        <a
          href="https://thinkmarketingbend.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Think Marketing
        </a>
      </p>
    </footer>
  );
}
