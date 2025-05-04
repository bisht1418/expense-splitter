"use client"

import { formatDate } from "@/utils/dateFormatter"

export default function SettlementCard({ settlement, friends, currentUser }) {
  // Get friend name by ID
  const getFriendName = (friendId) => {
    const friend = friends.find((f) => f.id === friendId)
    return friend ? friend.name : "Unknown"
  }

  const isFromFriend = settlement.direction === "from_friend"
  const friendName = getFriendName(settlement.friendId)

  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{isFromFriend ? `${friendName} paid you` : `You paid ${friendName}`}</h3>
          <p className="text-sm text-gray-500">{formatDate(settlement.date)}</p>
        </div>
        <div className="text-right">
          <p className={`font-semibold ${isFromFriend ? "text-green-600" : "text-red-600"}`}>
            ${settlement.amount.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">Settlement</p>
        </div>
      </div>
    </div>
  )
}
