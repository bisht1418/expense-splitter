"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"
import { formatDate } from "@/utils/dateFormatter"

export default function ExpenseList() {
  const [filter, setFilter] = useState("recent") // recent, all
  const { expenses } = useSelector((state) => state.expenses)
  const { friends } = useSelector((state) => state.friends)
  const { user } = useSelector((state) => state.auth)

  // Get friend name by ID
  const getFriendName = (friendId) => {
    const friend = friends.find((f) => f.id === friendId)
    return friend ? friend.name : "Unknown"
  }

  // Get payer name
  const getPayerName = (payerId) => {
    if (payerId === user?.id) return "You"
    return getFriendName(payerId)
  }

  // Filter and sort expenses
  const filteredExpenses = expenses
    .filter((expense) => {
      if (filter === "recent") {
        // Get expenses from the last 30 days
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return new Date(expense.date) >= thirtyDaysAgo
      }
      return true
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5) // Show only the 5 most recent expenses

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Expenses</h2>
        <Link href="/expenses" className="text-[#00c6ae] hover:underline text-sm">
          View All
        </Link>
      </div>

      <div className="mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("recent")}
            className={`btn ${filter === "recent" ? "btn-primary" : "btn-outline"}`}
          >
            Recent
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`btn ${filter === "all" ? "btn-primary" : "btn-outline"}`}
          >
            All
          </button>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <p className="text-gray-500">No expenses found.</p>
      ) : (
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className={`p-3 rounded-lg border ${expense.settled ? "bg-gray-50" : "bg-white"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{expense.description}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(expense.date)} • {getPayerName(expense.paidBy)} paid
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{expense.settled ? "Settled" : "Unsettled"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
