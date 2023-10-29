const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
});

userSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject.passwordHash;
    delete returnObject._id;
    delete returnObject.__v;
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
