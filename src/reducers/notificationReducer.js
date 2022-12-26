import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: ''
  },
  reducers: {
    displayMessage(state, action) {
      const newMessage = action.payload
      state.message = newMessage
    },
    removeMessage(state) {
      state.message = ''
    }
  }
})

export const { displayMessage, removeMessage } = notificationSlice.actions

let timeoutID

export const setMessage = (message, sec) => {
  return dispatch => {
    clearTimeout(timeoutID)
    const milliSec = sec * 1000
    dispatch(displayMessage(message))
    timeoutID = setTimeout(() => {
      dispatch(removeMessage())
    }, milliSec)
  }
}

export default notificationSlice.reducer