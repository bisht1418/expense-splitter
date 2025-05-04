"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { addFriend, removeFriend } from "@/redux/slices/friendsSlice"
import FriendCard from "@/components/FriendCard"

export default function FriendsPage() {
  const [newFriendName, setNewFriendName] = useState("")
  const [newFriendEmail, setNewFriendEmail] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()
  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector((state) => state.auth)
  const { friends } = useSelector((state) => state.friends)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleAddFriend = (e) => {
    e.preventDefault()
    setError("")

    if (!newFriendName || !newFriendEmail) {
      setError("Please fill in all fields")
      return
    }

    // Check if friend with this email already exists
    if (friends.some((friend) => friend.email === newFriendEmail)) {
      setError("A friend with this email already exists")
      return
    }

    const newFriend = {
      id: Date.now(),
      name: newFriendName,
      email: newFriendEmail,
    }

    dispatch(addFriend(newFriend))
    setNewFriendName("")
    setNewFriendEmail("")
  }

  const handleRemoveFriend = (friendId) => {
    dispatch(removeFriend(friendId))
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Friends & Roommates</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Add Friend Form */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Add New Friend</h2>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form onSubmit={handleAddFriend}>
              <div className="mb-4">
                <label htmlFor="friendName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="friendName"
                  className="input"
                  placeholder="Friend's name"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="friendEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="friendEmail"
                  className="input"
                  placeholder="Friend's email"
                  value={newFriendEmail}
                  onChange={(e) => setNewFriendEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Add Friend
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Friends List */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Your Friends</h2>
            {friends.length === 0 ? (
              <p className="text-gray-500">You haven't added any friends yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {friends.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} onRemove={() => handleRemoveFriend(friend.id)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
