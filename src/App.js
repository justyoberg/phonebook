import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => updatePersons(), []);

  const updatePersons = () => {
    personService.getAll().then((data) => setPersons(data));
  };

  const formatName = (name) => {
    const splitName = name.split(" ");
    return splitName
      .map((name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      })
      .join(" ");
  };

  const postPerson = (person) => {
    personService.create(person).then((data) => {
      persons.concat(data);
      updatePersons();
      updateMessage(`${person.name} was added to phonebook`);
    });
  };

  const updatePersonEntry = (id, newEntry) => {
    personService.update(id, newEntry).then(() => updatePersons());
  };

  const addEntry = (event) => {
    event.preventDefault();

    const newEntry = {
      name: formatName(newName),
      number: newNumber,
    };

    if (nameExists(newName)) {
      const wantsUpdate = window.confirm(
        `${newName} is already in the phonebook. Update with new number?`
      );
      if (wantsUpdate) {
        const personId = nameExists(newName).id;
        updatePersonEntry(personId, newEntry);
      }
    } else if (numberExists(newNumber)) {
      alert(`${newNumber} is already in the phonebook`);
    } else {
      postPerson(newEntry);
    }
    setNewName("");
    setNewNumber("");
  };

  const numberExists = (number) => {
    return persons.find((person) => person.number === number);
  };

  const nameExists = (name) => {
    return persons.find(
      (person) =>
        person.name.toString().toLowerCase() === name.toString().toLowerCase()
    );
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

  const updateMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setMessage(null);
      setShowMessage(false);
    }, 5000);
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
      <Notification message={message} shown={showMessage} />
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
