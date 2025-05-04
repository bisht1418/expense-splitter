"use client"

import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import authReducer from "./slices/authSlice"
import expensesReducer from "./slices/expensesSlice"
import friendsReducer from "./slices/friendsSlice"
import settlementsReducer from "./slices/settlementsSlice"

// Load state from localStorage
const loadState = () => {
  if (typeof window === "undefined") {
    return undefined
  }
  try {
    const serializedState = localStorage.getItem("expenseSplitterState")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error loading state from localStorage:", err)
    return undefined
  }
}

// Save state to localStorage
const saveState = (state) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("expenseSplitterState", serializedState)
  } catch (err) {
    console.error("Error saving state to localStorage:", err)
  }
}

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  friends: friendsReducer,
  settlements: settlementsReducer,
})

// Create store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
})

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState())
})
