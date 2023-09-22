const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URL;
console.log(`Database url:${url}`);
mongoose
  .connect(url)
  .then((result) => console.log("Connected to Mongodb"))
  .catch((error) => console.log("Error connection to Mongodb", error.message));

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
