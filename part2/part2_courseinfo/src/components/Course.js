import React from 'react'
import '../index.css';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  // const reducer = (sum, course.parts.excercises) => sum + course.parts.excercises;
  console.log(course.parts)
  const sum = course.parts.reduce((total, amount) => (total + amount.exercises),0)

  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = ( {courseParts} ) => {
  console.log(courseParts)
  return (
    <ul>
      {courseParts}
    </ul>
  )
}

const Content = ({ course }) => {
  console.log(course)
  const courseParts = course.parts.map(part => 
    <li key={part.id}>{part.name} {part.exercises}</li>
    )
  return (
    <div>
      <ul>
        <Part courseParts={courseParts}/>
      </ul>
    </div>
  )
}

const Course = ( {course} ) => {

  return (
    <div>
      <div><Header course={course} /></div>
      <div><Content course={course}/></div>
      <div><Total course={course}/></div>
    </div>
  )
}

export default Course