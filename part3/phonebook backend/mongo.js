const mongoose = require("mongoose");

const connectToDatabase = (password) => {
  const url = `mongodb+srv://zahirul:${password}@learnmongodb.mlttje8.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", false);
  mongoose.connect(url);
};
// create schema
const phoneBookSchema = mongoose.Schema({
  name: String,
  number: String,
});
// create model
const Person = mongoose.model("Person", phoneBookSchema);

if (process.argv.length < 3) {
  process.exit(1);
} else if (process.argv.length === 3) {
  // node mongo.js yourpassword
  const passwordDb = process.argv[2];
  connectToDatabase(passwordDb);
  // search database
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // node mongo.js yourpassword personName phoneNumber
  const passwordDb = process.argv[2];
  connectToDatabase(passwordDb);
  const personName = process.argv[3];
  const phoneNumer = process.argv[4];
  //create document
  const person = new Person({
    name: personName,
    number: phoneNumer,
  });
  // save data
  person.save().then((result) => {
    console.log(`added ${person.name} ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
