import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fivediamondsranches.com"),
  title: "Five Diamonds Ranches | Central Oregon Beef",
  description:
    "Five Diamonds Ranches is preparing a Central Oregon beef offering rooted in ranch-raised cattle, family stewardship, and local land.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://fivediamondsranches.com",
    title: "Five Diamonds Ranches | Central Oregon Beef",
    description:
      "Ranch-raised Central Oregon beef from Five Diamonds Ranches.",
    images: [
      {
        url: "/central-oregon-ranch.png",
        width: 1774,
        height: 887,
        alt: "Black cattle grazing beneath the Central Oregon Cascades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Five Diamonds Ranches | Central Oregon Beef",
    description:
      "Ranch-raised Central Oregon beef from Five Diamonds Ranches.",
    images: ["/central-oregon-ranch.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
