import { useState } from "react";

const Person = ({ personList, findName }) => {
  // Add phonenumber and id to the persons
  const updatePersons = personList.map((person) => {
    let uuid = self.crypto.randomUUID();
    return { ...person, number: "040-1234567", id: uuid };
  });
  // Display phonebook person name and number
  const displayPersonsName = (personsList) => {
    return personsList.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ));
  };
  // Filter persons based on searchName
  const filterPerson = personList.filter((person) => {
    return person.name.toLocaleLowerCase().includes(findName.toLowerCase());
  });
  return (
    <div>
      {personList.length === 1
        ? displayPersonsName(updatePersons)
        : displayPersonsName(filterPerson)}
    </div>
  );
};
const PersonForm = ({
  handleAddName,
  addName,
  setName,
  addPhone,
  setPhone,
}) => {
  return (
    <form onSubmit={handleAddName}>
      <div>
        <div>
          <label>
            name:
            <input
              type="text"
              value={addName}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            number:
            <input
              type="text"
              value={addPhone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Filter = ({ findName, setFindName }) => {
  return (
    <form>
      <label>
        filter shown with
        <input
          type="text"
          value={findName}
          onChange={(event) => {
            setFindName(event.target.value);
          }}
        />
      </label>
    </form>
  );
};
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
      const matchPerson = persons.some((person) => person.name === newName);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter findName={searchName} setFindName={setSearchName} />
      <h3>add a new</h3>
      <PersonForm
        handleAddName={addName}
        addName={newName}
        setName={setNewName}
        addPhone={newPhoneNumber}
        setPhone={setNewPhoneNumber}
      />
      <h3>Numbers</h3>
      <Person personList={persons} findName={searchName} />
    </div>
  );
};

export default App;
