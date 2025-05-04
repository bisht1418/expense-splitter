"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { addSettlement } from "@/redux/slices/settlementsSlice"
import { calculateBalances } from "@/utils/expenseCalculator"
import SettlementCard from "@/components/SettlementCard"

export default function SettlementsPage() {
  const [balances, setBalances] = useState([])
  const [selectedFriend, setSelectedFriend] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()
  const dispatch = useDispatch()

  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { expenses } = useSelector((state) => state.expenses)
  const { friends } = useSelector((state) => state.friends)
  const { settlements } = useSelector((state) => state.settlements)

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

  const handleSettlement = (e) => {
    e.preventDefault()
    setError("")

    if (!selectedFriend || !amount) {
      setError("Please fill in all fields")
      return
    }

    if (isNaN(amount) || Number.parseFloat(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    const selectedBalance = balances.find((balance) => balance.friendId.toString() === selectedFriend)

    if (!selectedBalance) {
      setError("Friend not found")
      return
    }

    // Check if settlement amount is valid
    if (Number.parseFloat(amount) > Math.abs(selectedBalance.balance)) {
      setError(`The maximum amount you can settle is $${Math.abs(selectedBalance.balance).toFixed(2)}`)
      return
    }

    const newSettlement = {
      id: Date.now(),
      date: new Date().toISOString(),
      userId: user.id,
      friendId: Number.parseInt(selectedFriend),
      amount: Number.parseFloat(amount),
      direction: selectedBalance.balance > 0 ? "to_friend" : "from_friend",
    }

    dispatch(addSettlement(newSettlement))
    setSelectedFriend("")
    setAmount("")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settlements</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Settlement Form */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Record a Settlement</h2>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form onSubmit={handleSettlement}>
              <div className="mb-4">
                <label htmlFor="friend" className="block text-sm font-medium text-gray-700 mb-1">
                  Friend
                </label>
                <select
                  id="friend"
                  className="input"
                  value={selectedFriend}
                  onChange={(e) => setSelectedFriend(e.target.value)}
                >
                  <option value="">Select a friend</option>
                  {balances.map((balance) => {
                    const friend = friends.find((f) => f.id === balance.friendId)
                    if (!friend) return null
                    return (
                      <option key={friend.id} value={friend.id}>
                        {friend.name} (
                        {balance.balance > 0
                          ? `You owe $${balance.balance.toFixed(2)}`
                          : balance.balance < 0
                            ? `Owes you $${Math.abs(balance.balance).toFixed(2)}`
                            : "Settled up"}
                        )
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-4">
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
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Record Settlement
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Settlement History */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Settlement History</h2>
            {settlements.length === 0 ? (
              <p className="text-gray-500">No settlements recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {settlements.map((settlement) => (
                  <SettlementCard key={settlement.id} settlement={settlement} friends={friends} currentUser={user} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
