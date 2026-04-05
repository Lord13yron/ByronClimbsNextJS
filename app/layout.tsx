import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const cabin = Cabin({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Byron Climbs - Your Climbing Community",
    template: "%s | Byron Climbs",
  },
  description:
    "Discover climbing routes, track your progress, and connect with the climbing community.",
  keywords: [
    "climbing",
    "bouldering",
    "sport climbing",
    "rock climbing",
    "climbing routes",
  ],
  authors: [{ name: "Byron Hayes" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Byron Climbs",
    title: "Byron Climbs - Your Climbing Community",
    description:
      "Discover climbing routes, track your progress, and connect with the climbing community.",
  },

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cabin.className} antialiased min-h-screen grid grid-rows-[auto_1fr_auto]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />
            <main className="h-full overflow-auto pb-8">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
