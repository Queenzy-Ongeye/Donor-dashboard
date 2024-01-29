"use client";
import "@/app/globals.css";
import PageWrapper from "./Components/Wrapper";

export type TChildren = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: TChildren) {
  return (
    <html lang="en">
      <head />
      <body className="flex bg-gray-50 w-[100%]">
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
