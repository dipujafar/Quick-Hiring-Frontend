import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import { envConfig } from "@/config";
import localFont from "next/font/local";
import Navbar from "@/components/shared/Navbar";
import NextTopLoader from "nextjs-toploader";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const clashDispaly = localFont({
  src: "../fonts/clash_display/ClashDisplay.otf",
  variable: "--font-clash",
});

export const metadata: Metadata = {
  title: {
    template: "%s | QuickHire",
    default: "QuickHire - Find Your Job",
  },
  description:
    "The offical job portal of Bangladesh — find full-time, part-time, remote, and freelance jobs. Connect with top employers and apply instantly.",

  keywords: [
    "job",
    "jobs",
    "Bangladeshi job",
    "Software development",
    "engineering job",
    "Web Development",
    "App Development",
  ],
  metadataBase: new URL(envConfig.frontendUrl as string),
  openGraph: {
    title: "QuickHire - Find Your Perfect Job ",
    description:
      "The offical job portal of Bangladesh — find full-time, part-time, remote, and freelance jobs. Connect with top employers and apply instantly.",
    url: envConfig.frontendUrl,
    siteName: "QuickHire",
    images: [`${envConfig.frontendUrl}/og-image.png`],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${epilogue.className} ${clashDispaly.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <Navbar /> */}
        {children}

         <NextTopLoader
            color="#4640DE"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #232323,0 0 5px #EA5326"
            zIndex={1600}
            showAtBottom={false}
          />
      </body>
    </html>
  );
}
