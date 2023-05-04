// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    incNumber: (state, action) => {
      return state + 1
    },
    decNumber: state => {
      return state - 1
    }
  }
})

export const { incNumber, decNumber } = authSlice.actions

export default authSlice.reducer
