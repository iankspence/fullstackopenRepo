import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>next anecdote</button>
  )
}

const VoteButton = ({ handleVote }) => {
  return (
    <button onClick={handleVote}>Vote</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteCounts, setVote] = useState([0,0,0,0,0,0])

  const handleClick = () => {
      const newIndex = [(Math.round(((Math.random() * 5))))]
      setSelected(newIndex)
  }

  const handleVote = () => {
    const currentAnecdote = props.anecdotes[selected]
    const currentIndex = anecdotes.indexOf(currentAnecdote)
    const voteCountsCopy = [...voteCounts]
    voteCountsCopy[currentIndex] += 1
    setVote(voteCountsCopy)
  }

  const maxCount = Math.max.apply(Math, voteCounts)
  const whichMax = voteCounts.indexOf(maxCount)

  return (                              // change 0-1 to range from -0.5 to 5.49, (round to 0 to 5 evenly)
    <div>
      {props.anecdotes[selected]}
    
      <div>has {voteCounts[anecdotes.indexOf(props.anecdotes[selected])]} votes</div>
      <div><Button handleClick={handleClick}/></div>
      <div><VoteButton handleVote={handleVote}/></div>
      <div>
        <h1>Anecdote with most votes</h1>
        <div>{props.anecdotes[whichMax]}</div>
      </div>
    </div>  
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)