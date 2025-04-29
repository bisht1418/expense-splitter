"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { deleteExpense } from "@/redux/features/expensesSlice"
import Link from "next/link"
import { ArrowLeft, Edit, Trash2, DollarSign, Calendar, User, Tag, Users } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ExpenseDetailsPage({ params }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { expenses } = useSelector((state) => state.expenses)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [expense, setExpense] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Find the expense by ID
  useEffect(() => {
    if (expenses.length > 0) {
      const foundExpense = expenses.find((e) => e.id === Number.parseInt(params.id))
      setExpense(foundExpense)

      // If expense not found, redirect to expenses list
      if (!foundExpense) {
        router.push("/dashboard/expenses")
      }
    }
  }, [expenses, params.id, router])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call delay
    setTimeout(() => {
      dispatch(deleteExpense(Number.parseInt(params.id)))
      router.push("/dashboard/expenses")
    }, 800)
  }

  if (!isAuthenticated || !expense) {
    return null // Don't render anything while redirecting or loading
  }

  // Calculate per person amount
  const perPersonAmount = expense.amount / expense.participants.length

  // Format date
  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Category styling
  const categoryConfig = {
    Food: { color: "bg-green-100 text-green-600" },
    Utilities: { color: "bg-blue-100 text-blue-600" },
    Entertainment: { color: "bg-purple-100 text-purple-600" },
    Housing: { color: "bg-red-100 text-red-600" },
    Transportation: { color: "bg-yellow-100 text-yellow-600" },
    Other: { color: "bg-gray-100 text-gray-600" },
  }

  const categoryStyle = categoryConfig[expense.category] || categoryConfig.Other

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/dashboard/expenses" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Expenses
        </Link>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h1 className="text-2xl font-bold text-gray-900">{expense.title}</h1>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Link
                  href={`/dashboard/expenses/${params.id}/edit`}
                  className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Expense Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Details</h2>
                <div className="space-y-4">
                  {/* Amount */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        <DollarSign className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                      <p className="text-lg font-bold text-gray-900">${expense.amount.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Date</h3>
                      <p className="text-lg font-medium text-gray-900">{formattedDate}</p>
                    </div>
                  </div>

                  {/* Paid By */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        <User className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Paid By</h3>
                      <p className="text-lg font-medium text-gray-900">{expense.paidBy}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-lg ${categoryStyle.color}`}>
                        <Tag className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Category</h3>
                      <p className="text-lg font-medium text-gray-900">{expense.category}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Split Details</h2>
                <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-indigo-700">Total Amount:</span>
                    <span className="font-bold text-indigo-700">${expense.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-indigo-700">Split Between:</span>
                    <span className="font-bold text-indigo-700">{expense.participants.length} people</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-indigo-700">Each Person Pays:</span>
                    <span className="font-bold text-indigo-700">${perPersonAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Participants */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Participants
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 gap-2">
                      {expense.participants.map((participant, index) => (
                        <div key={index} className="flex items-center p-2 bg-white rounded-md border border-gray-200">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-sm mr-3">
                            {participant.charAt(0)}
                          </div>
                          <span className="text-gray-900">{participant}</span>
                          {participant === expense.paidBy && (
                            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Paid
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Expense</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this expense? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${
                    isDeleting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
