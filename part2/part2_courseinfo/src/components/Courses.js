import React from 'react'
import Course from './Course'

const Courses = ( {courses} ) => {

    return (
      <div>
        <h1>Web Development Curriculum</h1>
        <ul>
          {courses.map(course =>
            <li key={course.id}>
              <Course course={course}/>
            </li>
          )}
        </ul>
      </div>
    )
}

  export default Courses
  