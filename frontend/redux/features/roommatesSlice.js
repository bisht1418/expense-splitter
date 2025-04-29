import { createSlice } from "@reduxjs/toolkit"

// Dummy data for roommates
const initialRoommates = [
  { id: 1, name: "Alex", email: "alex@example.com", phone: "555-123-4567", joinedDate: "2023-01-15" },
  { id: 2, name: "Jamie", email: "jamie@example.com", phone: "555-234-5678", joinedDate: "2023-01-15" },
  { id: 3, name: "Taylor", email: "taylor@example.com", phone: "555-345-6789", joinedDate: "2023-02-01" },
]

const initialState = {
  roommates: initialRoommates,
}

export const roommatesSlice = createSlice({
  name: "roommates",
  initialState,
  reducers: {
    addRoommate: (state, action) => {
      const newRoommate = {
        id: state.roommates.length + 1,
        ...action.payload,
        joinedDate: new Date().toISOString().split("T")[0],
      }
      state.roommates.push(newRoommate)
    },
    updateRoommate: (state, action) => {
      const { id, ...updates } = action.payload
      const roommateIndex = state.roommates.findIndex((roommate) => roommate.id === id)
      if (roommateIndex !== -1) {
        state.roommates[roommateIndex] = { ...state.roommates[roommateIndex], ...updates }
      }
    },
    deleteRoommate: (state, action) => {
      state.roommates = state.roommates.filter((roommate) => roommate.id !== action.payload)
    },
  },
})

export const { addRoommate, updateRoommate, deleteRoommate } = roommatesSlice.actions

export default roommatesSlice.reducer
