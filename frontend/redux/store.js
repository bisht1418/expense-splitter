import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/authSlice"
import expensesReducer from "./features/expensesSlice"
import roommatesReducer from "./features/roommatesSlice"

// Create the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    roommates: roommatesReducer,
  },
})

// Add a custom persistence mechanism
if (typeof window !== "undefined") {
  // Load state from localStorage on initialization
  try {
    const persistedState = localStorage.getItem("roomSplitState")
    if (persistedState) {
      const state = JSON.parse(persistedState)
      // Dispatch actions to set the state
      if (state.auth && state.auth.isAuthenticated) {
        store.dispatch({ type: "auth/login", payload: state.auth.user })
      }
      if (state.expenses && state.expenses.expenses) {
        state.expenses.expenses.forEach((expense) => {
          store.dispatch({ type: "expenses/addExpense", payload: expense })
        })
      }
      if (state.roommates && state.roommates.roommates) {
        state.roommates.roommates.forEach((roommate) => {
          store.dispatch({ type: "roommates/addRoommate", payload: roommate })
        })
      }
    }
  } catch (e) {
    console.error("Error loading persisted state:", e)
  }

  // Subscribe to store changes to save to localStorage
  store.subscribe(() => {
    try {
      const state = store.getState()
      localStorage.setItem("roomSplitState", JSON.stringify(state))
    } catch (e) {
      console.error("Error saving state to localStorage:", e)
    }
  })
}
