"use client"

export default function FriendCard({ friend, onRemove }) {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#00c6ae] flex items-center justify-center text-white font-bold mr-3">
            {friend.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium">{friend.name}</h3>
            <p className="text-sm text-gray-500">{friend.email}</p>
          </div>
        </div>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-500" title="Remove friend">
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
  )
}
