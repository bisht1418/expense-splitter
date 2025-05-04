"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addExpense } from "@/redux/slices/expensesSlice"

export default function AddExpenseModal({ onClose }) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [paidBy, setPaidBy] = useState("")
  const [splitType, setSplitType] = useState("equal") // equal, custom
  const [splits, setSplits] = useState([])
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { friends } = useSelector((state) => state.friends)

  // Initialize splits when paidBy or splitType changes
  const initializeSplits = (payer, type) => {
    if (!payer || !type) return

    const allParticipants = [user, ...friends]
    const totalParticipants = allParticipants.length

    if (type === "equal") {
      // Equal split
      const equalAmount = amount ? Number.parseFloat(amount) / totalParticipants : 0

      const newSplits = allParticipants.map((participant) => ({
        userId: participant.id,
        amount: Number.parseFloat(equalAmount.toFixed(2)),
      }))

      setSplits(newSplits)
    } else {
      // Custom split - initialize with 0
      const newSplits = allParticipants.map((participant) => ({
        userId: participant.id,
        amount: 0,
      }))

      setSplits(newSplits)
    }
  }

  // Update splits when amount changes
  const updateEqualSplits = (newAmount) => {
    if (!newAmount || splitType !== "equal") return

    const allParticipants = [user, ...friends]
    const totalParticipants = allParticipants.length
    const equalAmount = Number.parseFloat(newAmount) / totalParticipants

    const newSplits = allParticipants.map((participant) => ({
      userId: participant.id,
      amount: Number.parseFloat(equalAmount.toFixed(2)),
    }))

    setSplits(newSplits)
  }

  // Handle split amount change
  const handleSplitAmountChange = (userId, newAmount) => {
    const updatedSplits = splits.map((split) =>
      split.userId === userId ? { ...split, amount: Number.parseFloat(newAmount) || 0 } : split,
    )

    setSplits(updatedSplits)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!description || !amount || !date || !paidBy) {
      setError("Please fill in all required fields")
      return
    }

    if (isNaN(amount) || Number.parseFloat(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    // Validate splits
    const totalSplit = splits.reduce((sum, split) => sum + split.amount, 0)
    if (Math.abs(totalSplit - Number.parseFloat(amount)) > 0.01) {
      setError(`Split amounts must equal the total amount (${Number.parseFloat(amount).toFixed(2)})`)
      return
    }

    // Create new expense
    const newExpense = {
      id: Date.now(),
      description,
      amount: Number.parseFloat(amount),
      date,
      paidBy: Number.parseInt(paidBy),
      splits,
      settled: false,
    }

    dispatch(addExpense(newExpense))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Expense</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="input"
                  placeholder="e.g., Dinner, Groceries, Rent"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    className="input pl-7"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value)
                      updateEqualSplits(e.target.value)
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="paidBy" className="block text-sm font-medium text-gray-700 mb-1">
                  Paid By
                </label>
                <select
                  id="paidBy"
                  className="input"
                  value={paidBy}
                  onChange={(e) => {
                    setPaidBy(e.target.value)
                    initializeSplits(e.target.value, splitType)
                  }}
                  required
                >
                  <option value="">Select who paid</option>
                  <option value={user.id}>You</option>
                  {friends.map((friend) => (
                    <option key={friend.id} value={friend.id}>
                      {friend.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Split Type</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-teal-500"
                      name="splitType"
                      value="equal"
                      checked={splitType === "equal"}
                      onChange={() => {
                        setSplitType("equal")
                        initializeSplits(paidBy, "equal")
                      }}
                    />
                    <span className="ml-2">Equal</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-teal-500"
                      name="splitType"
                      value="custom"
                      checked={splitType === "custom"}
                      onChange={() => {
                        setSplitType("custom")
                        initializeSplits(paidBy, "custom")
                      }}
                    />
                    <span className="ml-2">Custom</span>
                  </label>
                </div>
              </div>

              {paidBy && splits.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Split Details</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                    {splits.map((split) => {
                      const participant = split.userId === user.id ? user : friends.find((f) => f.id === split.userId)

                      if (!participant) return null

                      return (
                        <div key={split.userId} className="flex justify-between items-center">
                          <span>{participant.id === user.id ? "You" : participant.name}</span>
                          {splitType === "equal" ? (
                            <span>${split.amount.toFixed(2)}</span>
                          ) : (
                            <div className="relative w-24">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="number"
                                className="input pl-7 py-1 text-sm"
                                step="0.01"
                                min="0"
                                value={split.amount || ""}
                                onChange={(e) => handleSplitAmountChange(split.userId, e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>Total:</span>
                    <span
                      className={`font-medium ${
                        Math.abs(
                          splits.reduce((sum, split) => sum + split.amount, 0) - Number.parseFloat(amount || 0),
                        ) > 0.01
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      ${splits.reduce((sum, split) => sum + split.amount, 0).toFixed(2)} / $
                      {Number.parseFloat(amount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md font-medium transition-colors border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-medium transition-colors bg-teal-500 text-white hover:bg-teal-600"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
