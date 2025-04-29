"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { addRoommate } from "@/redux/features/roommatesSlice"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, ArrowRight } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AddRoommatePage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Phone is optional, but validate format if provided
    if (formData.phone && !/^[0-9-+() ]*$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Create new roommate object
    const newRoommate = {
      ...formData,
      joinedDate: new Date().toISOString().split("T")[0],
    }

    // Simulate API call delay
    setTimeout(() => {
      dispatch(addRoommate(newRoommate))
      router.push("/dashboard/roommates")
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl mx-auto">
        {/* Back button */}
        <Link href="/dashboard/roommates" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Roommates
        </Link>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">Add New Roommate</h1>
            <p className="text-gray-600">Invite a roommate to share expenses with you.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="(555) 123-4567"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Invitation Note */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-medium text-indigo-800 mb-2">What happens next?</h3>
                <p className="text-sm text-indigo-700">
                  When you add a roommate, they'll be included in your expense tracking. In a real app, we would send
                  them an invitation email to join your household.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Adding..." : "Add Roommate"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
