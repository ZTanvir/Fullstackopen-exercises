import { useState, useEffect } from "react";
import noteServices from "./services/personsService";

const Person = ({ personList, findName, handleDeletePerson }) => {
  // Display phonebook person name and number
  const displayPersonsName = (personsList) => {
    return personsList.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDeletePerson(person.id)}>delete</button>
      </p>
    ));
  };
  // Filter persons based on searchName
  const filterPerson = personList.filter((person) => {
    return person.name.toLowerCase().includes(findName.toLowerCase());
  });
  return (
    <div>
      {personList.length === 1
        ? displayPersonsName(personList)
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  // get persons data from http://localhost:3000/persons
  useEffect(() => {
    noteServices.getAll().then((data) => setPersons(data));
  }, []);

  // Add name and phone number to the persons when submit the form
  const addName = (event) => {
    event.preventDefault();
    if (newName !== "" && newPhoneNumber !== "") {
      // check if the name is already present in updatePersons
      const isAnyPersonMatch = persons.some(
        (person) => person.name === newName
      );
      if (isAnyPersonMatch) {
        // find the person
        const findPerson = persons.find((person) => person.name === newName);
        console.log(findPerson);
        // ask the permission to update the number
        if (
          window.confirm(
            `${findPerson.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          // update person number with new number
          const updatePerson = { ...findPerson, number: newPhoneNumber };
          // update the number in the db.json
          noteServices.update(updatePerson.id, updatePerson).then((data) => {
            // update the number in the persons state
            setPersons(
              persons.map((person) =>
                person.name !== updatePerson.name ? person : updatePerson
              )
            );
            setNewName("");
            setNewPhoneNumber("");
          });
          console.log("Confirm");
        }
      } else {
        const newPerson = {
          name: newName,
          number: newPhoneNumber,
        };
        // add new person name and phone number to json server
        noteServices
          .create(newPerson)
          .then((data) => setPersons(persons.concat(data)));
        setNewName("");
        setNewPhoneNumber("");
      }
    }
  };
  // Delete name from phone book
  const deletePerson = (id) => {
    const findPerson = persons.find((person) => person.id === id);
    const isConfirmDelete = window.confirm(`Delete ${findPerson.name}?`);
    if (isConfirmDelete) {
      noteServices.deleteData(id).then((data) => {
        setPersons(persons.filter((person) => person.id !== findPerson.id));
      });
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
      <Person
        personList={persons}
        findName={searchName}
        handleDeletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
