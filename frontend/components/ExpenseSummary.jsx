"use client"

import { useState, useEffect } from "react"

export default function ExpenseSummary({ expenses, userId }) {
  const [totalPaid, setTotalPaid] = useState(0)
  const [totalOwed, setTotalOwed] = useState(0)
  const [netBalance, setNetBalance] = useState(0)

  useEffect(() => {
    if (!expenses || !userId) return

    let paid = 0
    let owed = 0

    expenses.forEach((expense) => {
      // If current user paid for the expense
      if (expense.paidBy === userId) {
        paid += expense.amount

        // Calculate how much others owe the current user
        expense.splits.forEach((split) => {
          if (split.userId !== userId) {
            owed += split.amount
          }
        })
      } else {
        // If someone else paid, calculate how much the current user owes
        expense.splits.forEach((split) => {
          if (split.userId === userId) {
            owed -= split.amount
          }
        })
      }
    })

    setTotalPaid(paid)
    setTotalOwed(owed)
    setNetBalance(owed)
  }, [expenses, userId])

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Expense Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold">${totalPaid.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Total Owed</p>
          <p className="text-2xl font-bold">${Math.abs(totalOwed).toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-lg ${netBalance >= 0 ? "bg-green-50" : "bg-red-50"}`}>
          <p className="text-sm text-gray-500">Net Balance</p>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
            {netBalance >= 0 ? "+" : "-"}${Math.abs(netBalance).toFixed(2)}
          </p>
          <p className="text-xs mt-1">
            {netBalance > 0 ? "You are owed money" : netBalance < 0 ? "You owe money" : "You're all settled up"}
          </p>
        </div>
      </div>
    </div>
  )
}
