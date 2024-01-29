import React from "react";
import { NextAuthProvider } from "./(site)/providers";
import "./globals.css";
import GoogleAnalytics from "./(site)/utils/helpers/analytics";
import { AppProvider } from "./context/AppContext";

export const metadata = {
  title: "FIM Dashboard",
  description: "Fim Dashboard",
};

export type TChildren = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: TChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <GoogleAnalytics
          ga_id={`${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <NextAuthProvider>
          <AppProvider>{children}</AppProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
