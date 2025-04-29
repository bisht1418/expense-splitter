"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { PlusCircle, DollarSign, Users, ArrowUpRight, ArrowDownRight, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import ExpenseCard from "@/components/expense-card"
import DebtSummary from "@/components/debt-summary"

// Dummy data
const recentExpenses = [
  { id: 1, title: "Groceries", amount: 89.47, date: "2023-04-25", paidBy: "You", category: "Food" },
  { id: 2, title: "Electricity Bill", amount: 124.33, date: "2023-04-22", paidBy: "Alex", category: "Utilities" },
  { id: 3, title: "Internet", amount: 60.0, date: "2023-04-20", paidBy: "Jamie", category: "Utilities" },
  { id: 4, title: "Movie Night", amount: 42.5, date: "2023-04-18", paidBy: "You", category: "Entertainment" },
]

const upcomingExpenses = [
  { id: 5, title: "Rent", amount: 1800.0, date: "2023-05-01", category: "Housing" },
  { id: 6, title: "Water Bill", amount: 45.2, date: "2023-05-05", category: "Utilities" },
]

const debts = [
  { id: 1, name: "Alex", amount: 78.25, type: "youOwe" },
  { id: 2, name: "Jamie", amount: 124.5, type: "owesYou" },
  { id: 3, name: "Taylor", amount: 35.0, type: "owesYou" },
]

export default function Dashboard() {
  const { isAuthenticated } = useSelector((state) => state.auth)
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

  // Calculate totals
  const totalYouOwe = debts.filter((debt) => debt.type === "youOwe").reduce((sum, debt) => sum + debt.amount, 0)
  const totalOwedToYou = debts.filter((debt) => debt.type === "owesYou").reduce((sum, debt) => sum + debt.amount, 0)
  const netBalance = totalOwedToYou - totalYouOwe

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of your expenses.</p>
          </div>
          <Link
            href="/dashboard/expenses/add"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Expense
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Balance</p>
                <h3 className={`text-2xl font-bold mt-1 ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${Math.abs(netBalance).toFixed(2)}
                </h3>
              </div>
              <div
                className={`p-3 rounded-full ${netBalance >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
              >
                {netBalance >= 0 ? <ArrowUpRight className="h-6 w-6" /> : <ArrowDownRight className="h-6 w-6" />}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {netBalance >= 0 ? "You are owed money overall" : "You owe money overall"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">You Owe</p>
                <h3 className="text-2xl font-bold mt-1 text-red-600">${totalYouOwe.toFixed(2)}</h3>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Across {debts.filter((debt) => debt.type === "youOwe").length} people
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">You Are Owed</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">${totalOwedToYou.toFixed(2)}</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <ArrowDownRight className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Across {debts.filter((debt) => debt.type === "owesYou").length} people
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Expenses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-indigo-600" />
                    Recent Expenses
                  </h2>
                  <Link href="/dashboard/expenses" className="text-sm text-indigo-600 hover:text-indigo-800">
                    View all
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recentExpenses.map((expense) => (
                  <ExpenseCard key={expense.id} expense={expense} />
                ))}
              </div>
            </div>

            {/* Upcoming Expenses */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mt-8">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
                    Upcoming Expenses
                  </h2>
                  <Link href="/dashboard/expenses" className="text-sm text-indigo-600 hover:text-indigo-800">
                    View all
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {upcomingExpenses.map((expense) => (
                  <ExpenseCard key={expense.id} expense={expense} isUpcoming={true} />
                ))}
              </div>
            </div>
          </div>

          {/* Debt Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-indigo-600" />
                    Debt Summary
                  </h2>
                  <Link href="/dashboard/roommates" className="text-sm text-indigo-600 hover:text-indigo-800">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <DebtSummary debts={debts} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mt-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  href="/dashboard/expenses/add"
                  className="flex items-center p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <DollarSign className="mr-3 h-5 w-5" />
                  <span>Add a new expense</span>
                </Link>
                <Link
                  href="/dashboard/roommates/add"
                  className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Users className="mr-3 h-5 w-5" />
                  <span>Add a new roommate</span>
                </Link>
                <Link
                  href="/dashboard/expenses/settle"
                  className="flex items-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <ArrowUpRight className="mr-3 h-5 w-5" />
                  <span>Settle up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
