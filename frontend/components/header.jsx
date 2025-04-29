"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import {
  Menu,
  X,
  LogOut,
  Home,
  Users,
  Settings,
  DollarSign,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  // Check if current path is dashboard
  const isDashboard = pathname.includes("/dashboard");

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-white`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg">
              <DollarSign className="h-6 w-6" />
            </div>
            <span className={`font-bold text-xl `}>RoomSplit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/dashboard"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/expenses"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/dashboard/expenses"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Expenses
                </Link>
                <Link
                  href="/dashboard/roommates"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/dashboard/roommates"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Roommates
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/dashboard/settings"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Settings
                </Link>
                <div className="relative ml-3 flex items-center">
                  <button
                    className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={handleLogout}
                  >
                    <span>{user?.name || "User"}</span>
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium  `}
                >
                  Home
                </Link>
                <Link
                  href="/login"
                  className={`ml-2 px-4 py-2 rounded-md text-sm font-medium`}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="ml-2 px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/dashboard"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5" />
                    Dashboard
                  </div>
                </Link>
                <Link
                  href="/dashboard/expenses"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/dashboard/expenses"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5" />
                    Expenses
                  </div>
                </Link>
                <Link
                  href="/dashboard/roommates"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/dashboard/roommates"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5" />
                    Roommates
                  </div>
                </Link>
                <div className="border-t border-gray-200 my-2 pt-2">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Signed in as{" "}
                    <span className="font-medium text-indigo-600">
                      {user?.name || "User"}
                    </span>
                  </div>
                  <button
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/features"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/features"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/pricing"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <div className="border-t border-gray-200 my-2 pt-2">
                  <Link
                    href="/login"
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-center bg-gray-100 text-gray-700 hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full px-3 py-2 mt-2 rounded-md text-base font-medium text-center bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
