"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import ExpenseSummary from "@/components/ExpenseSummary"
import ExpenseList from "@/components/ExpenseList"
import FriendsList from "@/components/FriendsList"
import BalanceSummary from "@/components/BalanceSummary"
import AddExpenseModal from "@/components/AddExpenseModal"
import { calculateBalances } from "@/utils/expenseCalculator"

export default function Dashboard() {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [balances, setBalances] = useState([])
  const router = useRouter()
  const dispatch = useDispatch()

  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { expenses } = useSelector((state) => state.expenses)
  const { friends } = useSelector((state) => state.friends)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (user && friends.length > 0 && expenses.length > 0) {
      const calculatedBalances = calculateBalances(user.id, friends, expenses)
      setBalances(calculatedBalances)
    }
  }, [user, friends, expenses])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
        <button
          onClick={() => setShowAddExpenseModal(true)}
          className="px-4 py-2 rounded-md font-medium transition-colors bg-teal-500 text-white hover:bg-teal-600"
        >
          Add New Expense
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Summary and Balances */}
        <div className="lg:col-span-2 space-y-6">
          <ExpenseSummary expenses={expenses} userId={user?.id} />
          <BalanceSummary balances={balances} />
          <ExpenseList />
        </div>

        {/* Right Column - Friends List */}
        <div>
          <FriendsList />
        </div>
      </div>

      {showAddExpenseModal && <AddExpenseModal onClose={() => setShowAddExpenseModal(false)} />}
    </div>
  )
}
