import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  // Add phonenumber and id to the persons
  const updatePersons = persons.map((person) => {
    let uuid = self.crypto.randomUUID();
    return { ...person, number: "040-1234567", id: uuid };
  });

  // Add name and phone number to the persons when submit the form
  const addName = (event) => {
    event.preventDefault();
    if (newName !== "" && newPhoneNumber !== "") {
      // check if the name is already present in updatePersons
      const matchPerson = updatePersons.some(
        (person) => person.name === newName
      );
      if (matchPerson) {
        alert(`${newName} is already added to phonebook`);
      } else {
        let uuid = self.crypto.randomUUID();
        const newPerson = {
          name: newName,
          number: newPhoneNumber,
          id: uuid,
        };
        setPersons(updatePersons.concat(newPerson));
      }
      setNewName("");
      setNewPhoneNumber("");
    }
  };
  // Display phonebook person name and number
  const displayPersonsName = (personsList) => {
    return personsList.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ));
  };
  // Filter persons based on searchName
  const filterPerson = persons.filter((person) => {
    return person.name.toLocaleLowerCase().includes(searchName.toLowerCase());
  });
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <label>
          filter shown with
          <input
            type="text"
            value={searchName}
            onChange={(event) => {
              setSearchName(event.target.value);
              console.log(searchName);
            }}
          />
        </label>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          <div>
            <label>
              name:
              <input
                type="text"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              number:
              <input
                type="text"
                value={newPhoneNumber}
                onChange={(event) => setNewPhoneNumber(event.target.value)}
              />
            </label>
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.length === 1
          ? displayPersonsName(updatePersons)
          : displayPersonsName(filterPerson)}
      </div>
    </div>
  );
};

export default App;
