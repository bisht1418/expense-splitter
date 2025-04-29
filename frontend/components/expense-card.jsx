import { formatDistanceToNow, format, parseISO } from "date-fns"
import { DollarSign, Calendar, User, Users } from "lucide-react"

// Category icons and colors
const categoryConfig = {
  Food: { color: "bg-green-100 text-green-600" },
  Utilities: { color: "bg-blue-100 text-blue-600" },
  Entertainment: { color: "bg-purple-100 text-purple-600" },
  Housing: { color: "bg-red-100 text-red-600" },
  Transportation: { color: "bg-yellow-100 text-yellow-600" },
  Other: { color: "bg-gray-100 text-gray-600" },
}

export default function ExpenseCard({ expense, isUpcoming = false, showParticipants = false }) {
  const { id, title, amount, date, paidBy, category, participants } = expense

  // Format date
  const parsedDate = parseISO(date)
  const formattedDate = format(parsedDate, "MMM d, yyyy")
  const relativeDate = isUpcoming
    ? `Due in ${formatDistanceToNow(parsedDate)}`
    : `${formatDistanceToNow(parsedDate)} ago`

  // Get category styling
  const categoryStyle = categoryConfig[category] || categoryConfig.Other

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${categoryStyle.color}`}>
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{title}</h3>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 gap-y-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span title={formattedDate} className="mr-2">
                {relativeDate}
              </span>

              {!isUpcoming && (
                <>
                  <span className="mx-2 hidden sm:inline">•</span>
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-2">Paid by {paidBy}</span>
                </>
              )}

              {showParticipants && participants && (
                <>
                  <span className="mx-2 hidden sm:inline">•</span>
                  <Users className="h-4 w-4 mr-1" />
                  <span>{participants.length} people</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="font-medium text-gray-900">${amount.toFixed(2)}</span>
          <div className="text-xs text-gray-500 mt-1">{category}</div>
        </div>
      </div>
    </div>
  )
}
