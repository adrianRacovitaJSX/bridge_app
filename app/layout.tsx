import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { Toaster } from "@/components/ui/toaster";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bridge - Reuniones privadas y profesionales.",
  description: "Connecting people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        elements: {},
        variables: { colorPrimary: "#605cd4" },
        layout: {
          logoImageUrl: "/icons/logo.svg",
          logoLinkUrl: "/",
        },
      }}
    >
      <html lang="es">
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
          </body>
      </html>
    </ClerkProvider>
  );
}
