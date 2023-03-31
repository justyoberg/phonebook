import { useEffect, useState } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };

  const postPerson = (person) => {
    axios.post("http://localhost:3001/persons", person);
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
      fetchPersons();
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
    setFilter(event.target.value);
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
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h1>Add a new person</h1>
      <PersonForm
        addEntry={addEntry}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
