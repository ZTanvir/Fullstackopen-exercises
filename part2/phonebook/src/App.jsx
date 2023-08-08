import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  // Add id to the persons
  const updatePersons = persons.map((person) => {
    let uuid = self.crypto.randomUUID();
    return { ...person, id: uuid };
  });
  // Add name to the persons when sumit the form
  const addName = (event) => {
    event.preventDefault();
    if (newName !== "") {
      let uuid = self.crypto.randomUUID();
      const newPerson = {
        name: newName,
        id: uuid,
      };
      setPersons(updatePersons.concat(newPerson));
      setNewName("");
    }
  };
  // Display phonebook person name
  const displayPersonsName = (personList) => {
    return personList.map((person) => {
      return <p key={person.id}>{person.name}</p>;
    });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayPersonsName(updatePersons)}
    </div>
  );
};

export default App;
