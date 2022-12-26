import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

const byVotes = (a1, a2) => a2.votes - a1.votes

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      return state.map(a =>
        a.id !== action.payload.id ? a : action.payload
        ).sort(byVotes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = (await anecdoteService.getAll()).sort(byVotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdoteToVote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(anecdoteToVote.id, {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    })
    dispatch(vote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer