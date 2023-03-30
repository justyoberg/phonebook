const PersonForm = ({
  addEntry,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={addEntry}>
      <div>
        Name:
        <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        Number:
        <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
