import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import Header from "@/components/layout/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Multiverse Explorer",
    template: "%s | Multiverse Explorer",
  },
  description:
    "Explore Rick and Morty characters, their origins, statuses, and episode appearances.",
  applicationName: "Multiverse Explorer",
  keywords: [
    "Rick and Morty",
    "characters",
    "episodes",
    "multiverse explorer",
  ],
  authors: [{ name: "Multiverse Explorer" }],
  creator: "Multiverse Explorer",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Multiverse Explorer",
    title: "Multiverse Explorer",
    description:
      "Explore Rick and Morty characters, their origins, statuses, and episode appearances.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multiverse Explorer",
    description:
      "Explore Rick and Morty characters, their origins, statuses, and episode appearances.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07090f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full  bg-bg font-body text-text">
        <Header/>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
