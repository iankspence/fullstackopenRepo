import React from 'react'

const DisplayAll = ( { persons, removeEntry } ) => {

    console.log(persons)
    const personNames = persons.map((person) => person.name)

    const people = persons.map((individual) => 
    <li key={personNames.indexOf(individual.name)}>
      {individual.name} {individual.number}<button id={personNames.indexOf(individual.name)} onClick={removeEntry}>delete</button>
      </li>)
  
    return (
      <div>
        <h2>All Entries</h2>
        <ol>
          {people}
        </ol>
      </div>
    )
}

export default DisplayAll