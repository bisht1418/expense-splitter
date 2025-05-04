"use client"

import { createSlice } from "@reduxjs/toolkit"

// Sample settlements data
const initialSettlements = [
  {
    id: 1,
    date: "2023-05-25",
    userId: 1,
    friendId: 2,
    amount: 60.0,
    direction: "from_friend", // from_friend or to_friend
  },
]

const initialState = {
  settlements: initialSettlements,
}

const settlementsSlice = createSlice({
  name: "settlements",
  initialState,
  reducers: {
    addSettlement: (state, action) => {
      state.settlements.push(action.payload)
    },
    deleteSettlement: (state, action) => {
      state.settlements = state.settlements.filter((settlement) => settlement.id !== action.payload)
    },
  },
})

export const { addSettlement, deleteSettlement } = settlementsSlice.actions
export default settlementsSlice.reducer
