"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { addExpense } from "@/redux/features/expensesSlice"
import { DollarSign, Calendar, Users, Tag, ArrowRight } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AddExpensePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { roommates } = useSelector((state) => state.roommates)
  const { categories } = useSelector((state) => state.expenses)
  const { user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "Food",
    paidBy: "You",
    participants: ["You"],
    splitEqually: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleParticipantToggle = (participant) => {
    setFormData((prev) => {
      const participants = [...prev.participants]

      if (participants.includes(participant)) {
        // Don't allow removing "You" as a participant
        if (participant === "You") return prev

        // Remove participant
        return {
          ...prev,
          participants: participants.filter((p) => p !== participant),
        }
      } else {
        // Add participant
        return {
          ...prev,
          participants: [...participants, participant],
        }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Calculate per person amount
    const perPersonAmount = formData.splitEqually
      ? Number.parseFloat(formData.amount) / formData.participants.length
      : 0

    // Create expense object
    const newExpense = {
      ...formData,
      amount: Number.parseFloat(formData.amount),
      perPersonAmount,
      createdBy: user?.name || "You",
      createdAt: new Date().toISOString(),
    }

    // Dispatch to Redux
    dispatch(addExpense(newExpense))

    // Redirect after a short delay to simulate API call
    setTimeout(() => {
      router.push("/dashboard/expenses")
      setIsSubmitting(false)
    }, 800)
  }

  // Calculate split preview
  const calculateSplitPreview = () => {
    if (!formData.amount || isNaN(Number.parseFloat(formData.amount))) return null

    const amount = Number.parseFloat(formData.amount)
    const perPerson = amount / formData.participants.length

    return {
      total: amount.toFixed(2),
      perPerson: perPerson.toFixed(2),
      count: formData.participants.length,
    }
  }

  const splitPreview = calculateSplitPreview()

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Expense</h1>
          <p className="text-gray-600">Enter the details of your expense to split with roommates.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expense Title */}
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Expense Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="form-input-gradient w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Groceries, Rent, Utilities"
                />
              </div>

              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                    className="form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 appearance-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Paid By */}
              <div>
                <label htmlFor="paidBy" className="block text-sm font-medium text-gray-700 mb-1">
                  Paid By
                </label>
                <select
                  id="paidBy"
                  name="paidBy"
                  value={formData.paidBy}
                  onChange={handleChange}
                  className="form-input-gradient w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="You">You</option>
                  {roommates.map((roommate) => (
                    <option key={roommate.id} value={roommate.name}>
                      {roommate.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Split Method */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Split Method</label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="splitEqually"
                    name="splitMethod"
                    checked={formData.splitEqually}
                    onChange={() => setFormData((prev) => ({ ...prev, splitEqually: true }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="splitEqually" className="ml-2 block text-sm text-gray-700">
                    Split equally
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="splitUnequally"
                    name="splitMethod"
                    checked={!formData.splitEqually}
                    onChange={() => setFormData((prev) => ({ ...prev, splitEqually: false }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    disabled
                  />
                  <label htmlFor="splitUnequally" className="ml-2 block text-sm text-gray-700">
                    Split unequally (Coming soon)
                  </label>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1 text-gray-500" />
                  <span>Who's involved?</span>
                </div>
              </label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* You (current user) */}
                  <div className="flex items-center p-3 bg-indigo-50 border border-indigo-200 rounded-lg cursor-not-allowed">
                    <input
                      type="checkbox"
                      id="participant-you"
                      checked={true}
                      disabled
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="participant-you" className="ml-2 block text-sm text-gray-700 font-medium">
                      You
                    </label>
                  </div>

                  {/* Roommates */}
                  {roommates.map((roommate) => (
                    <div
                      key={roommate.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.participants.includes(roommate.name)
                          ? "bg-indigo-50 border-indigo-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => handleParticipantToggle(roommate.name)}
                    >
                      <input
                        type="checkbox"
                        id={`participant-${roommate.id}`}
                        checked={formData.participants.includes(roommate.name)}
                        onChange={() => {}}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`participant-${roommate.id}`}
                        className="ml-2 block text-sm text-gray-700 font-medium"
                      >
                        {roommate.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Split Preview */}
            {splitPreview && (
              <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-medium text-indigo-800 mb-2">Split Preview</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <p className="text-sm text-indigo-700">
                      Total amount: <span className="font-bold">${splitPreview.total}</span>
                    </p>
                    <p className="text-sm text-indigo-700">
                      Split between: <span className="font-bold">{splitPreview.count} people</span>
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="text-sm text-indigo-700">
                      Each person pays: <span className="font-bold">${splitPreview.perPerson}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Adding..." : "Add Expense"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
