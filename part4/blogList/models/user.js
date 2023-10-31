const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
  username: { type: String, unique: true, required: true, minLength: 3 },
  name: { type: String },
  passwordHash: { type: String },
});

userSchema.plugin(uniqueValidator);

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
