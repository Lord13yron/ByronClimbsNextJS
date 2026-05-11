import type { Metadata } from "next";
import { Saira_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Byron Climbs",
    template: "%s | Byron Climbs",
  },
  description:
    "A personal climbing journal — routes logged, sends marked, beta left behind.",
  keywords: [
    "climbing",
    "bouldering",
    "sport climbing",
    "rock climbing",
    "climbing routes",
    "Okanagan",
  ],
  authors: [{ name: "Byron Hayes" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Byron Climbs",
    title: "Byron Climbs",
    description:
      "A personal climbing journal — routes logged, sends marked, beta left behind.",
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
        className={`${saira.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased min-h-screen grid grid-rows-[auto_1fr_auto]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />
            <main className="h-full overflow-auto">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
