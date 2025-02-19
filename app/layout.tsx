import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
