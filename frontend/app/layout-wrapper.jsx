"use client";

import { usePathname } from "next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";
import { useSelector } from "react-redux";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const hideLayout =
    pathname === "/login" || pathname === "/register" || isAuthenticated;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}
