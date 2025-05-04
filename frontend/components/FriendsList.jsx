"use client"

import { useSelector } from "react-redux"
import Link from "next/link"

export default function FriendsList() {
  const { friends } = useSelector((state) => state.friends)

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Friends & Roommates</h2>
        <Link href="/friends" className="text-[#00c6ae] hover:underline text-sm">
          Manage
        </Link>
      </div>

      {friends.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-500 mb-2">You haven't added any friends yet.</p>
          <Link href="/friends">
            <button className="btn btn-primary">Add Friends</button>
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {friends.map((friend) => (
            <li key={friend.id} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
              <div className="h-8 w-8 rounded-full bg-[#00c6ae] flex items-center justify-center text-white font-bold mr-3">
                {friend.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{friend.name}</p>
                <p className="text-xs text-gray-500">{friend.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
