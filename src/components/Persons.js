const Persons = ({ personsToShow }) =>{
  console.log(personsToShow);
  return (
    <ul>
      {personsToShow.map(person => {
        return <li key={person.id}>{person.name} - {person.number}</li>
      })}
    </ul>
  )
}

export default Persons