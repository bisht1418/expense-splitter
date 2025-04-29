"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Link from "next/link"
import { Home, DollarSign, Users, Settings, Menu, X, PieChart, Clock, LogOut } from "lucide-react"

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Expenses", href: "/dashboard/expenses", icon: DollarSign },
    { name: "Roommates", href: "/dashboard/roommates", icon: Users },
  ]

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-50 w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg">
              <DollarSign className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-gray-900">RoomSplit</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <button
            className="mt-4 w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
            onClick={() => router.push("/login")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white shadow-lg">
            <div className="flex items-center h-16 px-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg text-gray-900">RoomSplit</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                </div>
              </div>
              <button
                className="mt-4 w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                onClick={() => router.push("/login")}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">{children}</main>
      </div>
    </div>
  )
}
