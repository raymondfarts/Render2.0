import phoneServices from '../services/phoneServices'

export default function Form(props) {

  function handleSubmit(event) {
    event.preventDefault()

    const foundPerson = props.persons.find((person) => person.name === props.newName)

    //TODO: Disable serverchange msg if error occurs, set conditioinal
    if (foundPerson !== undefined) {
      props.setNewName('')
      props.setNewNumber('')
      const replaceNumber = confirm(`${props.newName} has already been added to the phonebook, would you like to replace their phone number?`)
      if (replaceNumber) {
        phoneServices.update(foundPerson.id, { ...foundPerson, number: props.newNumber })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {props.setErrorMsg(`${foundPerson.name}'s information was not found on the server`) 
        setTimeout(() => props.setErrorMsg(null), 5000)
        })        
        props.setDatabaseChange(props.databaseChange + 1)
        props.setServerChanges(`${foundPerson.name}'s number was successfully updated`)
        setTimeout(() => props.setServerChanges(null), 5000)
      }
    }
    else {
      // const newPerson = { name: props.newName, number: props.newNumber, id: (parseInt(props.persons.length) + 1).toString() }
      //BACKEND GENERATES ID NOW, SETTING IT HERE CAUSES BUG WHERE YOU NEED TO PRESS DELETE TWICE TO REMOVE PERSON BECAUSE 
      //IDS DONT MATCH ON FIRST CLICK BUT BACKEND OVERWRITES THE ID CREATED HERE WITH ITS OWN, THEN SECOND CLICK IDS MATCH PROPERLY
      const newPerson = { name: props.newName, number: props.newNumber}
      //NVM NEED TO REFACTOR FRONT END IF I WANT BACKEND TO GENERATE IDS, LET FRONTEND GENERATE THE IDS FOR NOW

      //UPDATE: NVM, THE PAGE/FETCHED DATABASE WASN'T RE-RENDERING UPON ADDING A NEW PERSON, IT WOULD SEND THE DATA TO THE BACKEND BUT WE WOULD NOT 
      //GET THE DATA BACK, ALONG WITH THE NEW GENERATED ID, SO CLICKING DELETE BUTTON WOULD HAVE NO EFFECT SINCE IT DEPENDS ON HAVING THE ID DATA.
      // WE DONT HAVE ID DATA BECAUSE OUR USEEFFECT ONLY RENDERS INITALLY, HAVE TO UPDATE DATABASE CHANGE STATE TO RE-FETCH API 
      // DATA AND UPDATE OUR PHONEBOOK DATA ARRAY SINCE DATABASECHANGE IS OUR VALUE FOR THE DEPENDENCY ARRAY

      console.log(newPerson);

      props.setPersons(props.persons.concat(newPerson))
      props.setNewName('')
      props.setNewNumber('')

      phoneServices.create(newPerson)
      //ADDED THIS HERE TO FIX THE DELETE BUTTON
      props.setDatabaseChange(props.databaseChange + 1)

      props.setServerChanges(`${newPerson.name} was added to the phonebook`)
      setTimeout(() => props.setServerChanges(null), 5000)
    }
  }

  return (
    <>
      <h2>Add a Person</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
          Name: <input name="name" value={props.newName} onChange={props.handleChange} placeholder="Tim" />
        </div>
        <div>
          Phone Number: <input name="number" value={props.newNumber} onChange={props.handleChange} placeholder="123-666-22243" />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
    </>
  )
}