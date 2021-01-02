import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ( {text} ) => (<h1>{text}</h1>)

const Button = ( {onClick, text}) => <button onClick={onClick}>{text}</button>

const LineStatistics = ( { metric, allClicks }) => {

  ///ALL
  const all = allClicks.length
  if (metric === 'all'){
    return (all)
  }

  ///AVERAGE
  const sum = allClicks.reduce((a, b) => a + b, 0);
  const average = (sum / allClicks.length) || 0;
  if (metric === 'average'){
    return (average)
  }

  //POSITIVE
  function getOccurrence(array, value) { 
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }
  const positive = 100 * (getOccurrence(allClicks, 1) / all)

  if (metric === 'positive'){
    return (positive)
  }

}


const Display = ({ good, neutral, bad, allClicks }) => {

  if ((good + neutral + bad) === 0){
    return 'no feedback given'
  } else{

    return(
      <table>
        <tbody>
            <tr><td>good</td><td>{good}</td></tr>
            <tr><td>neutral</td><td>{neutral}</td></tr>
            <tr><td>bad</td><td>{bad}</td></tr>

            <tr><td>all</td><td><LineStatistics metric='all' allClicks={allClicks}/></td></tr>
            <tr><td>average</td><td><LineStatistics metric='average' allClicks={allClicks}/></td></tr>
            <tr><td>positive</td><td><LineStatistics metric='positive' allClicks={allClicks}/> %</td></tr>
          </tbody>
        </table>
      )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])


  const handleGoodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
  }

  return (

    <div>
        <Header text='give feedback' />
        <Button onClick = {handleGoodClick} text='good' />
        <Button onClick = {handleNeutralClick} text='neutral' />
        <Button onClick = {handleBadClick} text='bad' />
        <Header text='statistics' />
        <Display good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)