import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import PersistenceCheck from "@/components/persistence-check";
import LayoutWrapper from "./layout-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RoomSplit - Expense Splitter for Roommates",
  description:
    "Split expenses with roommates easily. Track bills, groceries, rent sharing with debt calculation.",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <PersistenceCheck />
          <LayoutWrapper>{children}</LayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
