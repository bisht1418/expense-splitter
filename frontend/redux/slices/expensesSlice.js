"use client"

import { createSlice } from "@reduxjs/toolkit"

// Sample expenses data
const initialExpenses = [
  {
    id: 1,
    description: "Groceries",
    amount: 75.5,
    date: "2023-05-15",
    paidBy: 1, // User ID
    splits: [
      { userId: 1, amount: 37.75 },
      { userId: 2, amount: 37.75 },
    ],
    settled: false,
  },
  {
    id: 2,
    description: "Dinner",
    amount: 120.0,
    date: "2023-05-20",
    paidBy: 2, // Friend ID
    splits: [
      { userId: 1, amount: 60.0 },
      { userId: 2, amount: 60.0 },
    ],
    settled: true,
  },
  {
    id: 3,
    description: "Rent",
    amount: 1200.0,
    date: "2023-06-01",
    paidBy: 1, // User ID
    splits: [
      { userId: 1, amount: 600.0 },
      { userId: 2, amount: 600.0 },
    ],
    settled: false,
  },
]

const initialState = {
  expenses: initialExpenses,
}

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload)
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex((expense) => expense.id === action.payload.id)
      if (index !== -1) {
        state.expenses[index] = action.payload
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload)
    },
    settleExpense: (state, action) => {
      const expense = state.expenses.find((expense) => expense.id === action.payload)
      if (expense) {
        expense.settled = true
      }
    },
  },
})

export const { addExpense, updateExpense, deleteExpense, settleExpense } = expensesSlice.actions
export default expensesSlice.reducer
