import type { Metadata } from "next";
import { Header, Footer } from "@/components/ranch/navigation";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://fivediamondsranches.com"),
  title: {
    default: "5 Diamonds Ranches | Oregon Beef",
    template: "%s | 5 Diamonds Ranches",
  },
  description:
    "Explore quarter, half and whole Oregon ranch beef from 5 Diamonds Ranches. A clearer way to buy beef, with pricing based on packaged take-home weight.",
  authors: [{ name: "Think Marketing", url: "https://thinkmarketingbend.com" }],
  openGraph: {
    type: "website",
    siteName: "5 Diamonds Ranches",
    images: [
      {
        url: "/central-oregon-ranch.png",
        width: 1774,
        height: 887,
        alt: "Cattle in open Oregon pasture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/central-oregon-ranch.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development", "built-by": "Think Marketing" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
