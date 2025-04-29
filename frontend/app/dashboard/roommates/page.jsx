"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { deleteRoommate } from "@/redux/features/roommatesSlice"
import Link from "next/link"
import { PlusCircle, Mail, Phone, Calendar, Trash2, Edit, Search, UserPlus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function RoommatesPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { roommates } = useSelector((state) => state.roommates)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredRoommates, setFilteredRoommates] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [roommateToDelete, setRoommateToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // Apply search filter
  useEffect(() => {
    if (searchTerm) {
      setFilteredRoommates(
        roommates.filter(
          (roommate) =>
            roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            roommate.email.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    } else {
      setFilteredRoommates(roommates)
    }
  }, [roommates, searchTerm])

  const handleDeleteClick = (roommate) => {
    setRoommateToDelete(roommate)
    setShowDeleteConfirm(true)
  }

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call delay
    setTimeout(() => {
      dispatch(deleteRoommate(roommateToDelete.id))
      setShowDeleteConfirm(false)
      setIsDeleting(false)
    }, 800)
  }

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Roommates</h1>
            <p className="text-gray-600">Manage your roommates and track shared expenses.</p>
          </div>
          <Link
            href="/dashboard/roommates/add"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Roommate
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search roommates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input-gradient w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Roommates List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Your Roommates</h2>
          </div>

          {filteredRoommates.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredRoommates.map((roommate) => (
                <div key={roommate.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                        {roommate.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{roommate.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1 gap-2 sm:gap-4">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            <span>{roommate.email}</span>
                          </div>
                          {roommate.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              <span>{roommate.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Joined {new Date(roommate.joinedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-4 md:mt-0 space-x-2">
                      <Link
                        href={`/dashboard/roommates/${roommate.id}/edit`}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(roommate)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No roommates found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "No roommates match your search criteria." : "You haven't added any roommates yet."}
              </p>
              {!searchTerm && (
                <Link
                  href="/dashboard/roommates/add"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Your First Roommate
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && roommateToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Remove Roommate</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to remove <span className="font-medium">{roommateToDelete.name}</span> from your
                roommates? This action cannot be undone.
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
                  {isDeleting ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
