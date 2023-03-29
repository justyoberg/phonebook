const Persons = ({ personsToShow }) => {
  if (!personsToShow) return
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} - {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
