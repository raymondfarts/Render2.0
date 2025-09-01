import phoneServices from "../services/phoneServices"

export default function Display(props) {

    // TODO: RE-RENDER PAGE UPON DELETIION
    function handleClick(event) {
        const personId = event.target.value
        console.log(event.target.value);
        console.log('clicked')

        const confirmationResult = window.confirm(`Are you sure you want to delete ${event.target.name}?`)
        console.log(confirmationResult);

        if (confirmationResult) {            
            props.setDatabaseChange(props.databaseChange + 1)
            phoneServices.remove(personId.toString())
            props.setServerChanges(`${event.target.name} was removed from the phonebook`)
            setTimeout(() => props.setServerChanges(null), 5000)
        }

    }

    const filteredPeople = props.persons.filter((person) => person.name.toLowerCase().includes(props.filteredPerson.toLowerCase()))

    const phonebookNames = props.persons.map((person) => {
        return (
            <>
                <div key={person.name}>{person.name} {person.number} <button value={person.id} name={person.name} onClick={handleClick}>delete</button></div>
            </>
        )
    })

    const filteredPhonebook = filteredPeople.map((person) => {
        return (
            <>
                <div key={person.name}>{person.name} {person.number} <button value={person.id} name={person.name} onClick={handleClick}>delete</button></div>
            </>)
    })

    return (
        <>
            <h2>Phone Numbers</h2>
            {filteredPeople.length > 0 ? filteredPhonebook : phonebookNames}
        </>
    )
}