"use client"

// Calculate balances between the current user and friends
export const calculateBalances = (userId, friends, expenses) => {
  // Initialize balances for each friend
  const balances = friends.map((friend) => ({
    friendId: friend.id,
    friendName: friend.name,
    balance: 0, // Positive means user owes friend, negative means friend owes user
  }))

  // Process each expense
  expenses.forEach((expense) => {
    // Skip settled expenses
    if (expense.settled) return

    // Get the user's split
    const userSplit = expense.splits.find((split) => split.userId === userId)
    if (!userSplit) return

    // If the user paid for the expense
    if (expense.paidBy === userId) {
      // Calculate how much each friend owes the user
      expense.splits.forEach((split) => {
        if (split.userId !== userId) {
          const friendBalance = balances.find((b) => b.friendId === split.userId)
          if (friendBalance) {
            // Friend owes user, so decrease the balance (negative means friend owes user)
            friendBalance.balance -= split.amount
          }
        }
      })
    }
    // If a friend paid for the expense
    else {
      // User owes the friend who paid
      const friendBalance = balances.find((b) => b.friendId === expense.paidBy)
      if (friendBalance) {
        // User owes friend, so increase the balance (positive means user owes friend)
        friendBalance.balance += userSplit.amount
      }
    }
  })

  // Apply settlements
  // This would be implemented if we had a settlements array
  // For now, we'll just return the calculated balances

  return balances
}
