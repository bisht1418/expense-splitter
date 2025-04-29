"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Link from "next/link"
import { ArrowLeft, CheckCircle, ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function SettleUpPage() {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state) => state.auth)

  // Get debts from the dummy data in the DebtSummary component
  const debts = [
    { id: 1, name: "Alex", amount: 78.25, type: "youOwe" },
    { id: 2, name: "Jamie", amount: 124.5, type: "owesYou" },
    { id: 3, name: "Taylor", amount: 35.0, type: "owesYou" },
  ]

  const [selectedDebt, setSelectedDebt] = useState(null)
  const [isSettling, setIsSettling] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleSettleUp = () => {
    if (!selectedDebt) return

    setIsSettling(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsSettling(false)
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setSelectedDebt(null)
      }, 3000)
    }, 1000)
  }

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  // Group debts by type
  const youOwe = debts.filter((debt) => debt.type === "youOwe")
  const owesYou = debts.filter((debt) => debt.type === "owesYou")

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settle Up</h1>
          <p className="text-gray-600">Record payments to settle debts with your roommates.</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">Payment recorded successfully! The debt has been settled.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* You Owe Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <ArrowUpRight className="mr-2 h-5 w-5 text-red-500" />
                You Owe
              </h2>
            </div>

            <div className="p-6">
              {youOwe.length > 0 ? (
                <div className="space-y-4">
                  {youOwe.map((debt) => (
                    <div
                      key={debt.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedDebt && selectedDebt.id === debt.id
                          ? "bg-indigo-50 border-indigo-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedDebt(debt)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-medium text-sm mr-3">
                            {debt.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{debt.name}</h3>
                            <p className="text-sm text-gray-500">You owe them</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-red-600">${debt.amount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">You don't owe anyone money.</p>
                </div>
              )}
            </div>
          </div>

          {/* Owes You Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <ArrowDownRight className="mr-2 h-5 w-5 text-green-500" />
                Owes You
              </h2>
            </div>

            <div className="p-6">
              {owesYou.length > 0 ? (
                <div className="space-y-4">
                  {owesYou.map((debt) => (
                    <div
                      key={debt.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedDebt && selectedDebt.id === debt.id
                          ? "bg-indigo-50 border-indigo-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedDebt(debt)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-sm mr-3">
                            {debt.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{debt.name}</h3>
                            <p className="text-sm text-gray-500">Owes you</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600">${debt.amount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No one owes you money.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settlement Form */}
        {selectedDebt && (
          <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Record Payment</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                  <div className="flex items-center">
                    <div
                      className={`h-10 w-10 rounded-full ${selectedDebt.type === "youOwe" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"} flex items-center justify-center font-medium text-sm mr-3`}
                    >
                      {selectedDebt.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedDebt.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedDebt.type === "youOwe" ? "You owe them" : "Owes you"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold ${selectedDebt.type === "youOwe" ? "text-red-600" : "text-green-600"}`}>
                      ${selectedDebt.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={selectedDebt.amount.toFixed(2)}
                    readOnly
                    className="form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">This will settle the full amount owed.</p>
              </div>

              <div className="mb-6">
                <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  id="method"
                  name="method"
                  className="form-input-gradient w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="cash">Cash</option>
                  <option value="venmo">Venmo</option>
                  <option value="paypal">PayPal</option>
                  <option value="zelle">Zelle</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSettleUp}
                  disabled={isSettling}
                  className={`inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                    isSettling ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSettling ? "Processing..." : "Record Payment"}
                  <CheckCircle className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
