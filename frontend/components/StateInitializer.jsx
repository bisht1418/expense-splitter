"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { login } from "@/redux/slices/authSlice"

// This component handles hydration of the Redux store from localStorage
export default function StateInitializer() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if there's a saved user in localStorage
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("expenseSplitterState")

      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState)

          // If there was a logged in user, restore the session
          if (parsedState?.auth?.isAuthenticated && parsedState?.auth?.user) {
            dispatch(login(parsedState.auth.user))
          }
        } catch (error) {
          console.error("Error parsing saved state:", error)
        }
      }
    }
  }, [dispatch])

  return null
}
