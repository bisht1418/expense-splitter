"use client"

import { createSlice } from "@reduxjs/toolkit"

// Sample friends data
const initialFriends = [
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
  },
]

const initialState = {
  friends: initialFriends,
}

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    addFriend: (state, action) => {
      state.friends.push(action.payload)
    },
    updateFriend: (state, action) => {
      const index = state.friends.findIndex((friend) => friend.id === action.payload.id)
      if (index !== -1) {
        state.friends[index] = action.payload
      }
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter((friend) => friend.id !== action.payload)
    },
  },
})

export const { addFriend, updateFriend, removeFriend } = friendsSlice.actions
export default friendsSlice.reducer
