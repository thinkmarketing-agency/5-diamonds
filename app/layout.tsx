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
        url: "/5-diamonds-share.png",
        width: 1536,
        height: 1024,
        alt: "5 Diamonds Ranches — Beef, Hay, Family",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/5-diamonds-share.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg?v=diamond-brown", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: { "codex-preview": "development", "built-by": "Think Marketing" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-KDQL4DMC"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`,
          }}
        />
      </head>
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
