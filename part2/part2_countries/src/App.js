import React, { useState, useEffect } from 'react'
import axios from 'axios'


// My Personal Key and Starting Command: REACT_APP_API_KEY='f6713b1baaa1f0722192907d4e0c8e9a' npm start

const DisplayCountryInfo = ({ country, newData }) => {

  const countryObject = newData[country.key]
  const languageList = countryObject.languages.map((language) => {
    return (<li key={language.iso692_2}>{language.name}</li>)
  })
  console.log(languageList)
  return (
    <div>
      <h1>{countryObject.name}</h1>
      <div>capital {countryObject.capital}</div>
      <div>population {countryObject.population}</div>
      <h3>languages</h3>
      <ul>{languageList}</ul>
      <img src={countryObject.flag} width={100} alt={"flag not available"}></img>
      <div><DisplayWeather location={countryObject.capital}/></div>
    </div>
  )
}


const DisplayCountryButtons = ({ newData, newMatches }) => {

  const [newCountryButtons, setCountryButtons] = useState(-1)

  const countryObjects = newData.filter((country) => {
    return ( newMatches.indexOf(country.name) !== -1 )})

  const handleButtonClick = (event) => {
    // console.log(event.target.id)
    setCountryButtons(event.target.id)
    console.log(event.target.id)
    console.log(countryObjects[event.target.id])
  }

  const countryButtonDisplay = newMatches.map((validMatch) => {

  if (countryObjects[newCountryButtons] === undefined) {
    return (
      <li id={newMatches.indexOf(validMatch)} key={newMatches.indexOf(validMatch)}>{validMatch}
      <button id={newMatches.indexOf(validMatch)} onClick={handleButtonClick}>show</button>
      </li>
    )} else {
      if (countryObjects[newCountryButtons].name === validMatch) {
        const languageList = countryObjects[newCountryButtons].languages.map((language) => {
          return (<li key={language.iso692_2}>{language.name}</li>)
        })

        return(
          <li>
          <h1>{countryObjects[newCountryButtons].name}</h1>
          <div>capital {countryObjects[newCountryButtons].capital}</div>
          <div>population {countryObjects[newCountryButtons].population}</div>
          <h3>languages</h3>
          <ul>{languageList}</ul>
          <img src={countryObjects[newCountryButtons].flag} width={100} alt={"flag not available"}></img>
          <div><DisplayWeather location={countryObjects[newCountryButtons].capital}/></div>
        </li>
        )
      } else {
        return (
          <li id={newMatches.indexOf(validMatch)} key={newMatches.indexOf(validMatch)}>{validMatch}
          <button id={newMatches.indexOf(validMatch)} onClick={handleButtonClick}>show</button>
          </li>
        )
      }
    }
  })

  return (
    <div>
      <ul>
        {countryButtonDisplay}
      </ul>
    </div>
    )

}



const DisplayWeather = ({ location }) => {

  const [newWeather, setWeather] = useState()

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: location
  }

  const weatherHook = () => {

    axios
    .get('http://api.weatherstack.com/current', {params})
    .then(response => {
      const apiResponse = response.data
      setWeather(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`)
    }).catch(error => {
      console.log(error);
    });

  }
  useEffect(weatherHook)

  return(
    <div>{newWeather}</div>
  )

}


function App() {

  const [newData, setData] = useState([])       //input object from JSON
  const [newSearch, setSearch] = useState('')   //search box state
  const [newMatches, setMatches] = useState([]) //matching countries state

  // hook to set data state with input object
  const hook = () => {
    // console.log('hook')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      const responseData = response.data
      // console.log(responseData)
      // console.log('fulfilled')

        setData(responseData)
    })
  }
  useEffect(hook, [])


  const countryList = newData.map((country) => (country.name))
  const handleSearch = (event) => {
    setSearch(event.target.value)
    const searchMatches = countryList.filter((country) => country.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
    setMatches(searchMatches)
  }

  const filterCountries = (event) => {
    event.preventDefault()
  }


  //key is index from original array of objects (newData)
  if (newMatches.length < 10){
    const countryListDisplay = newMatches.map((validMatch) => <li key={countryList.indexOf(validMatch)}>{validMatch}</li>)
    // console.log(CountryListDisplay)
    if (newMatches.length === 1){

      return(
        <div>
          <form onChange={filterCountries}>
            Find Countries: <input value={newSearch} onChange={handleSearch}/>
          </form>
          <ul>{countryListDisplay}</ul>
          <div><DisplayCountryInfo newData={newData} country={countryListDisplay[0]}/></div>

        </div>
      )

    } else {

      return (
      <div>
        <form onChange={filterCountries}>
          Find Countries: <input value={newSearch} onChange={handleSearch}/>
        </form>
        {/* <ul>{countryListDisplay}</ul> */}
        <DisplayCountryButtons newData={newData} newMatches={newMatches} />
        {/* <DisplayCountryListInfo country={countryListDisplay[0]} newData={newData} matches={newMatches}/> */}

      </div>
    )}
    
  } else {
    return (
      <div>
      <form onSubmit={filterCountries}>
        Find Countries: <input value={newSearch} onChange={handleSearch}/>
      </form>
      <div>Enter more characters</div>
    </div>
    
    )
  }
}

export default App;