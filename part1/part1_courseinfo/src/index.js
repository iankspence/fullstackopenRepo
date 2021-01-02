import React, { useState } from 'react'
import ReactDOM from 'react-dom'





const Header = ( props ) => {
  return (<h1>{props.course}</h1>)
}

const Part = (props) => {

  const exercises = props.exercises
  const part = props.part
  return  (<div>{part} {exercises}</div>)
}


const Content = ( props ) => {

  console.log(props)

  return (
    <div>
      <Part part={props[0].name} exercises={props[0].exercises}  />
      <Part part={props[1].name} exercises={props[1].exercises}  />
      <Part part={props[2].name} exercises={props[2].exercises}  />

    </div>
  )
}


const Total = ( props ) => {
  const exSum = (props[0].exercises + props[1].exercises + props[2].exercises)

  return (
    <div>
      Number of total excerices {exSum}
    </div>

    )
}


const App = () => {

  const course = {

    name: 'Half Stack application development',
    parts:[
      {name: 'Fundamentals of React',
      exercises: 10},
    
      {name: 'Using props to pass data',
      exercises: 7},
    
      {name: 'State of a component',
      exercises: 14}
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content {... course.parts}/>
      <Total {... course.parts}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))







