import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    updatePersons();
  }, []);

  const updatePersons = () => {
    personService.getAll().then((data) => setPersons(data));
  };

  const postPerson = (person) => {
    personService.create(person).then((data) => {
      persons.concat(data);
      updatePersons();
    });
  };

  const addEntry = (event) => {
    event.preventDefault();

    if (nameExists(newName)) {
      alert(`${newName} is already in the phonebook`);
    } else if (numberExists(newNumber)) {
      alert(`${newNumber} is already in the phonebook`);
    } else {
      postPerson({
        name: newName,
        number: newNumber,
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const numberExists = (number) => {
    return persons.find((person) => person.number === number);
  };

  const nameExists = (name) => {
    return persons.find((person) => person.name === name);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleDeletion = (id) => {
    personService.deletePerson(id).then(() => updatePersons());
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) => {
          return (
            person.name.toLowerCase().includes(filter) ||
            person.number.includes(filter)
          );
        });

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm
        addEntry={addEntry}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={handleDeletion} />
    </div>
  );
};

export default App;
