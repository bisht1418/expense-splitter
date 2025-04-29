"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "@/redux/features/authSlice"

export default function PersistenceCheck() {
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if we have persisted auth data in localStorage
    try {
      const persistedState = localStorage.getItem("roomSplitState")
      if (persistedState) {
        const state = JSON.parse(persistedState)
        if (state.auth && state.auth.isAuthenticated && state.auth.user) {
          // Re-login the user with the persisted data
          dispatch(login(state.auth.user))
        }
      }
    } catch (e) {
      console.error("Error checking persisted state:", e)
    }

    setIsLoaded(true)
  }, [dispatch])

  // Don't render anything, this is just for state initialization
  return null
}
