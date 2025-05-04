"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { deleteExpense, settleExpense } from "@/redux/slices/expensesSlice"
import ExpenseDetailCard from "@/components/ExpenseDetailCard"
import AddExpenseModal from "@/components/AddExpenseModal"
import EditExpenseModal from "@/components/EditExpenseModal"

export default function ExpensesPage() {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [filter, setFilter] = useState("all") // all, unsettled, settled

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

  const handleDeleteExpense = (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteExpense(expenseId))
    }
  }

  const handleSettleExpense = (expenseId) => {
    dispatch(settleExpense(expenseId))
  }

  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
  }

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "all") return true
    if (filter === "settled") return expense.settled
    if (filter === "unsettled") return !expense.settled
    return true
  })

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Expenses</h1>
        <button onClick={() => setShowAddExpenseModal(true)} className="btn btn-primary">
          Add New Expense
        </button>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`btn ${filter === "all" ? "btn-primary" : "btn-outline"}`}
          >
            All Expenses
          </button>
          <button
            onClick={() => setFilter("unsettled")}
            className={`btn ${filter === "unsettled" ? "btn-primary" : "btn-outline"}`}
          >
            Unsettled
          </button>
          <button
            onClick={() => setFilter("settled")}
            className={`btn ${filter === "settled" ? "btn-primary" : "btn-outline"}`}
          >
            Settled
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredExpenses.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">No expenses found.</p>
            <button onClick={() => setShowAddExpenseModal(true)} className="btn btn-primary mt-4">
              Add Your First Expense
            </button>
          </div>
        ) : (
          filteredExpenses.map((expense) => (
            <ExpenseDetailCard
              key={expense.id}
              expense={expense}
              friends={friends}
              currentUserId={user.id}
              onDelete={() => handleDeleteExpense(expense.id)}
              onSettle={() => handleSettleExpense(expense.id)}
              onEdit={() => handleEditExpense(expense)}
            />
          ))
        )}
      </div>

      {showAddExpenseModal && <AddExpenseModal onClose={() => setShowAddExpenseModal(false)} />}

      {editingExpense && <EditExpenseModal expense={editingExpense} onClose={() => setEditingExpense(null)} />}
    </div>
  )
}
