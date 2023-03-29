const PersonForm = ({
  addName,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={addName}>
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
