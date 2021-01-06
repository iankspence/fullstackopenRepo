import React from 'react'

//Display will return a div with the state of persons that match with search field
const DisplaySearch = ( { newSearch, persons } ) => {
    const people = persons.map((individual) => <li key={individual.name}>{individual.name} {individual.number}</li>)
    const searchMatches = people.filter((person) => person.key.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1)
  
    return (
      <div>
        <h2>Search Match Entries</h2>
        <ol>
          {searchMatches}
        </ol>
      </div>
    )
  }
  
export default DisplaySearch