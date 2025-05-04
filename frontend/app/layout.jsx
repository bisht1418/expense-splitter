import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "../components/ClientWrapper"; // use relative path if needed

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
