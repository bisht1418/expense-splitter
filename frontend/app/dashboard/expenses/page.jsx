"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Link from "next/link"
import { PlusCircle, Filter, Search, Calendar, Tag, DollarSign } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import ExpenseCard from "@/components/expense-card"

export default function ExpensesPage() {
  const router = useRouter()
  const { expenses, categories } = useSelector((state) => state.expenses)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [dateFilter, setDateFilter] = useState("all")
  const [filteredExpenses, setFilteredExpenses] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // Apply filters
  useEffect(() => {
    let filtered = [...expenses]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((expense) => expense.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((expense) => expense.category === selectedCategory)
    }

    // Date filter
    const today = new Date()
    const oneWeekAgo = new Date(today)
    oneWeekAgo.setDate(today.getDate() - 7)
    const oneMonthAgo = new Date(today)
    oneMonthAgo.setMonth(today.getMonth() - 1)

    if (dateFilter === "week") {
      filtered = filtered.filter((expense) => new Date(expense.date) >= oneWeekAgo)
    } else if (dateFilter === "month") {
      filtered = filtered.filter((expense) => new Date(expense.date) >= oneMonthAgo)
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date))

    setFilteredExpenses(filtered)
  }, [expenses, searchTerm, selectedCategory, dateFilter])

  // Calculate total amount
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
            <p className="text-gray-600">Manage and track all your shared expenses.</p>
          </div>
          <Link
            href="/dashboard/expenses/add"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Expense
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="mr-2 h-5 w-5" />
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {/* Filters (Desktop) */}
            <div className="hidden md:flex gap-4">
              {/* Category Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input-gradient pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 appearance-none pr-8"
                >
                  <option value="All">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="form-input-gradient pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 appearance-none pr-8"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filters (Mobile) */}
          {isFilterOpen && (
            <div className="mt-4 flex flex-col gap-4 md:hidden">
              {/* Category Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  <option value="All">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-indigo-600" />
                Expenses
              </h2>
              <div className="text-sm text-gray-500">
                Total: <span className="font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {filteredExpenses.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredExpenses.map((expense) => (
                <Link key={expense.id} href={`/dashboard/expenses/${expense.id}`}>
                  <ExpenseCard expense={expense} showParticipants={true} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No expenses found.</p>
              <Link
                href="/dashboard/expenses/add"
                className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Your First Expense
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
