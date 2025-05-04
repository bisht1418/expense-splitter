"use client"

export default function BalanceSummary({ balances }) {
  // Group balances by whether they are positive (you owe) or negative (they owe you)
  const youOwe = balances.filter((balance) => balance.balance > 0)
  const theyOwe = balances.filter((balance) => balance.balance < 0)

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Balance Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* You Owe Section */}
        <div>
          <h3 className="text-lg font-medium mb-3 text-red-600">You Owe</h3>
          {youOwe.length === 0 ? (
            <p className="text-gray-500">You don't owe anyone.</p>
          ) : (
            <ul className="space-y-2">
              {youOwe.map((balance) => (
                <li key={balance.friendId} className="flex justify-between items-center p-2 bg-red-50 rounded-md">
                  <span>{balance.friendName}</span>
                  <span className="font-semibold text-red-600">${balance.balance.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* They Owe Section */}
        <div>
          <h3 className="text-lg font-medium mb-3 text-green-600">You Are Owed</h3>
          {theyOwe.length === 0 ? (
            <p className="text-gray-500">No one owes you money.</p>
          ) : (
            <ul className="space-y-2">
              {theyOwe.map((balance) => (
                <li key={balance.friendId} className="flex justify-between items-center p-2 bg-green-50 rounded-md">
                  <span>{balance.friendName}</span>
                  <span className="font-semibold text-green-600">${Math.abs(balance.balance).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
