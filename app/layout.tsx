import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Central Oregon Beef | Five Diamonds Ranches",
  description: "Local, ranch-raised beef from Five Diamonds Ranches in Central Oregon.",
  openGraph: {
    title: "Central Oregon Beef | Five Diamonds Ranches",
    description: "Local, ranch-raised beef from Five Diamonds Ranches in Central Oregon.",
    images: ["/central-oregon-ranch.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Central Oregon Beef | Five Diamonds Ranches",
    description: "Local, ranch-raised beef from Five Diamonds Ranches in Central Oregon.",
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
