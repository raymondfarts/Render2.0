import { useEffect, useState } from 'react'
import Form from "./components/Form"
import Display from './components/Display'
import Search from './components/Search'
import axios from 'axios'
import services from './services/phoneServices'

const App = () => {

  const [persons, setPersons] = useState([])
  const [databaseChange, setDatabaseChange] = useState(0)

  useEffect(() => {
    axios.get(services.baseUrl)
      .then(response => {
        const people = response.data
        setPersons(people)
      })
  }, [databaseChange])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPerson, setFilteredPerson] = useState('')
  const [serverChanges, setServerChanges] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  function handleChange(event) {

    const { name, value } = event.target
    console.log(value);

    if (name === "name") {
      setNewName(value)
    }
    else if (name === "number") {
      setNewNumber(value)
    }
    else if (name === "filter") {
      setFilteredPerson(value)
    }
  }

  return (
    <div>
      {serverChanges !== null ? <div className = "Action">{serverChanges}</div> : null}
      {errorMsg !== null ? <div className = "Error">{errorMsg}</div> : null}

      <h1>Phonebook</h1>
      <Search handleChange={handleChange} />
      <Form persons={persons} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons} handleChange={handleChange} setDatabaseChange={setDatabaseChange} databaseChange={databaseChange} setServerChanges = {setServerChanges} setErrorMsg = {setErrorMsg}/>
      <Display filteredPerson={filteredPerson} setFilteredPerson={setFilteredPerson} persons={persons} setDatabaseChange={setDatabaseChange} databaseChange={databaseChange} setServerChanges={setServerChanges}/>
    </div>
  )
}

export default App