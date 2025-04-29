import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function DebtSummary({ debts }) {
  // Group debts by type
  const youOwe = debts.filter((debt) => debt.type === "youOwe")
  const owesYou = debts.filter((debt) => debt.type === "owesYou")

  return (
    <div className="space-y-6">
      {/* You owe section */}
      {youOwe.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">You owe</h3>
          <div className="space-y-3">
            {youOwe.map((debt) => (
              <div key={debt.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-medium text-sm mr-3">
                    {debt.name.charAt(0)}
                  </div>
                  <span className="text-gray-900">{debt.name}</span>
                </div>
                <div className="flex items-center text-red-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="font-medium">${debt.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Owes you section */}
      {owesYou.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Owes you</h3>
          <div className="space-y-3">
            {owesYou.map((debt) => (
              <div key={debt.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-sm mr-3">
                    {debt.name.charAt(0)}
                  </div>
                  <span className="text-gray-900">{debt.name}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span className="font-medium">${debt.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {debts.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-500">No debts to display</p>
        </div>
      )}
    </div>
  )
}
