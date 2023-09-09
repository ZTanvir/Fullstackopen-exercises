const express = require("express");
const app = express();
const PORT = 3001;
app.use(express.json());
// Date today
const today = new Date();
// generate random number
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.post("/api/persons", (request, response) => {
  const body = request.body;
  // check does the name and number is available
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  } else if (body.name) {
    // check does the name is unique
    const matchName = persons.some((person) => person.name === body.name);
    if (matchName) {
      return response.status(400).json({
        error: "name must be unique",
      });
    }
  }
  const person = {
    name: body.name,
    number: body.number,
    id: getRandomInt(1000),
  };
  persons = persons.concat(person);
  response.json(person);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people<br/>${today}</p>`
  );
});
// single route
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
// delete
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(202).end();
});
app.listen(PORT, () => {
  console.log(`Server start at port ${PORT}`);
});
