import type { Metadata } from "next";
import "./globals.css";
import Toast from "@/app/components/Toast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-50 min-h-screen flex flex-col">{children}</div>
        <Toast />
      </body>
    </html>
  );
}
