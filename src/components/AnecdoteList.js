import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import Filter from './Filter'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.filter.text === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.text.toLowerCase()))
  })

  return(
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <ul>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(voteAnecdote(anecdote))
              dispatch(setMessage(`you voted "${anecdote.content}"`, 5))
            }}
          />
        )}
      </ul>
    </div>
  )
}

export default AnecdoteList