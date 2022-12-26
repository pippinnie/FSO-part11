import { createSlice } from '@reduxjs/toolkit'

const filterReducer = createSlice({
  name: 'filter',
  initialState: {
    text: ''
  },
  reducers: {
    setFilter(state, action) {
      const newFilter = action.payload
      state.text = newFilter
    }
  }
})

export const { setFilter } = filterReducer.actions

export default filterReducer.reducer