"use client"

import { formatDate } from "@/utils/dateFormatter"

export default function ExpenseDetailCard({ expense, friends, currentUserId, onDelete, onSettle, onEdit }) {
  // Get friend name by ID
  const getFriendName = (friendId) => {
    if (friendId === currentUserId) return "You"
    const friend = friends.find((f) => f.id === friendId)
    return friend ? friend.name : "Unknown"
  }

  // Calculate what the current user owes or is owed for this expense
  const calculateUserBalance = () => {
    if (expense.paidBy === currentUserId) {
      // Current user paid, so they are owed money
      const userSplit = expense.splits.find((split) => split.userId === currentUserId)
      const userAmount = userSplit ? userSplit.amount : 0
      return expense.amount - userAmount
    } else {
      // Someone else paid, current user owes money
      const userSplit = expense.splits.find((split) => split.userId === currentUserId)
      return userSplit ? -userSplit.amount : 0
    }
  }

  const userBalance = calculateUserBalance()

  return (
    <div className={`card ${expense.settled ? "bg-gray-50" : ""}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{expense.description}</h3>
          <p className="text-sm text-gray-500">
            {formatDate(expense.date)} • {getFriendName(expense.paidBy)} paid ${expense.amount.toFixed(2)}
          </p>
        </div>
        <div className="flex space-x-2">
          {!expense.settled && (
            <>
              <button onClick={onEdit} className="text-gray-400 hover:text-gray-600" title="Edit expense">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button onClick={onSettle} className="text-gray-400 hover:text-green-600" title="Mark as settled">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </>
          )}
          <button onClick={onDelete} className="text-gray-400 hover:text-red-500" title="Delete expense">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Split Details</h4>
        <ul className="space-y-2">
          {expense.splits.map((split) => (
            <li key={split.userId} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
              <span>{getFriendName(split.userId)}</span>
              <span className="font-medium">${split.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm font-medium">Status:</span>
          <span
            className={`ml-2 px-2 py-1 text-xs rounded-full ${expense.settled ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
          >
            {expense.settled ? "Settled" : "Unsettled"}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Your balance</p>
          <p
            className={`font-semibold ${userBalance > 0 ? "text-green-600" : userBalance < 0 ? "text-red-600" : "text-gray-600"}`}
          >
            {userBalance > 0
              ? `You are owed $${userBalance.toFixed(2)}`
              : userBalance < 0
                ? `You owe $${Math.abs(userBalance).toFixed(2)}`
                : "Settled"}
          </p>
        </div>
      </div>
    </div>
  )
}
