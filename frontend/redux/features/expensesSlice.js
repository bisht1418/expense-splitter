import { createSlice } from "@reduxjs/toolkit"

// Dummy data for expenses
const initialExpenses = [
  {
    id: 1,
    title: "Groceries",
    amount: 89.47,
    date: "2023-04-25",
    paidBy: "You",
    category: "Food",
    participants: ["You", "Alex", "Jamie"],
  },
  {
    id: 2,
    title: "Electricity Bill",
    amount: 124.33,
    date: "2023-04-22",
    paidBy: "Alex",
    category: "Utilities",
    participants: ["You", "Alex", "Jamie", "Taylor"],
  },
  {
    id: 3,
    title: "Internet",
    amount: 60.0,
    date: "2023-04-20",
    paidBy: "Jamie",
    category: "Utilities",
    participants: ["You", "Alex", "Jamie", "Taylor"],
  },
  {
    id: 4,
    title: "Movie Night",
    amount: 42.5,
    date: "2023-04-18",
    paidBy: "You",
    category: "Entertainment",
    participants: ["You", "Jamie"],
  },
  {
    id: 5,
    title: "Rent",
    amount: 1800.0,
    date: "2023-05-01",
    paidBy: "You",
    category: "Housing",
    participants: ["You", "Alex", "Jamie", "Taylor"],
  },
  {
    id: 6,
    title: "Water Bill",
    amount: 45.2,
    date: "2023-05-05",
    paidBy: "Taylor",
    category: "Utilities",
    participants: ["You", "Alex", "Jamie", "Taylor"],
  },
]

const initialState = {
  expenses: initialExpenses,
  categories: ["Food", "Utilities", "Entertainment", "Housing", "Transportation", "Other"],
}

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const newExpense = {
        id: state.expenses.length + 1,
        ...action.payload,
      }
      state.expenses.push(newExpense)
    },
    updateExpense: (state, action) => {
      const { id, ...updates } = action.payload
      const expenseIndex = state.expenses.findIndex((expense) => expense.id === id)
      if (expenseIndex !== -1) {
        state.expenses[expenseIndex] = { ...state.expenses[expenseIndex], ...updates }
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload)
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload)
      }
    },
  },
})

export const { addExpense, updateExpense, deleteExpense, addCategory } = expensesSlice.actions

export default expensesSlice.reducer
