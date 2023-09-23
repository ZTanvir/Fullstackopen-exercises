// import dotenv modules
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
//import database module
const Person = require("./modules/phone-number");
// import cors
const cors = require("cors");
app.use(cors());

// add front end to the server
app.use(express.static("dist"));
// import morgan middleware
// https://github.com/expressjs/morgan
const morgan = require("morgan");
// create a custom format fuction
// POST /api/persons 200 45 - 51.472 ms {"name":"example","number":"123456789"}
const tinyWithPost = (tokens, req, res) => {
  let postData = "";
  if (req.body.name) {
    postData = JSON.stringify(req.body);
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    postData,
  ].join(" ");
};
app.use(morgan(tinyWithPost));
app.use(express.json());

// routes
app.get("/api/persons", (request, response) => {
  Person.find({}).then((savePerson) => response.json(savePerson));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  // check does the name and number is available
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((createPerson) => response.json(createPerson));
});

app.get("/info", (request, response) => {
  Person.count().then((count) => {
    response.send(`<p>Phonebook has info for ${count} people<br/>${today}</p>`);
  });
});
// single routes
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then((foundPerson) => response.json(foundPerson))
    .catch((error) => {
      console.log("Error api/persons/id get request:", error.message);
      response.status(404).end();
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => response.status(200).end())
    .catch((error) => next(error));
});

app.listen(PORT || 3001, () => {
  console.log(`Server running on port ${PORT}`);
});
