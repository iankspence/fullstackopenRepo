import React, {useState, useEffect} from 'react'
import DisplaySearch from './DisplaySearch'
// import DisplayAll from './DisplayAll'
import phoneService from '../services/phone'

console.log(phoneService)
console.log('test')

const ErrorNotification = ({ message }) => {

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  if (message === null) {
    return null
  }
  return (
    <div style={error} className="error">
      {'Entry was already deleted from server'}
    </div>
  )
}



const Notification = ({ message }) => {

  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  if (message === null) {
    return null
  }
  return (
    <div style={success} className="success">
      {'Entry Received'}
    </div>
  )
}


const AddForm = ( { newName, newNumber, handleNameChange, handleNumberChange, newSearch } ) => {
  const [persons, setPersons] = useState([])
  const [entryState, setEntryState] = useState(null)
  const [errorState, setErrorState] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(intialEntries => {
        setPersons(intialEntries)
      })
  },[])
  
  const addPerson = (event) => {
    event.preventDefault()
    const listKeys = persons.map((person) => person.name)
    const phoneObject = {
      name: newName, 
      number: newNumber
    }

      //if name is not already in phonebook
    if (listKeys.indexOf(newName) === -1){ 
      phoneService
      .create(phoneObject)
      .then(newEntry => {
        setPersons(persons.concat(newEntry))
        setEntryState(true)
        setTimeout(() => {
          setEntryState(null)
        },3000)
      })
      .catch(newCatch => {
        setErrorState(true)
        setTimeout(() => {
          setErrorState(null)
        },5000)
      })

    } else {
      let proceed = window.confirm(`proceed to change ${newName}s number?`)
      
      if (proceed===true){
        const findID = () => persons.filter((individual) => {
            return (newName === individual.name)
          })
        phoneService
        .update(findID()[0].id, phoneObject)
        .then(newEntry => {
          setPersons(persons.concat(newEntry))
          setEntryState(true)
          setTimeout(() => {
            setEntryState(null)
          },3000)

        })
        .catch(error => {
          setErrorState(true)
          console.log(error)
          setTimeout(() => {
            setErrorState(null)
          },5000)

        })
        
      }
    }

  }


  const removeEntry = (event) => {
    console.log(event.target.id)
    console.log(persons)
    const rem = window.confirm(`do you want to delete entry`)

    if (rem === true){
      phoneService
      .remove(event.target.id)
      // .then(entries => {
      //   setPersons(entries)s
        // displayAll(persons)
    setTimeout(function(){
      phoneService
      .getAll()
      .then(intialEntries => {
        setPersons(intialEntries)
      })
      
    } ,500)
    }

  }

  const displayAll = () => {
    // const personNames = persons.map((person) => person.name)
    return( 
      persons.map((individual) => {
        return(
          <li key={individual.name}>
            {individual.name} {individual.number}<button id={individual.id} onClick={removeEntry}>delete</button>
          </li>
        )
      })
    )
  }


  if (errorState === true) {
    return (
      <div>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
            number:  <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
            <ErrorNotification message={{errorState}}/>
          </div>
          <div><DisplaySearch newSearch={newSearch} persons={persons}/></div>
        </form>
        
        <ol>
          {displayAll()}
        </ol>
      </div>
    )

  }

  // DisplayAll()
  if (entryState === null){
    return (
      <div>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
            number:  <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
          <div><DisplaySearch newSearch={newSearch} persons={persons}/></div>
        </form>
        <h2>All Entries</h2>
        <ol>
          {displayAll()}
        </ol>

        
        {/* <div><DisplayAll persons={persons} removeEntry={removeEntry}/></div> */}
  
      </div>
    )
  } else if (entryState === true) {
    return (
      <div>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
            number:  <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
            <Notification message={{entryState}}/>
          </div>
          <div><DisplaySearch newSearch={newSearch} persons={persons}/></div>
        </form>
        <ol>
          {displayAll()}
        </ol>
      </div>
    )
  }


  
  
}

export default AddForm