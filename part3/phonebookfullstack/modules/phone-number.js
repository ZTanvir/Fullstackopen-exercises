const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URL;
console.log(`Database url:${url}`);
mongoose
  .connect(url)
  .then(() => console.log('Connected to Mongodb'))
  .catch((error) => console.log('Error connection to Mongodb', error.message));

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    require: true,
  },
  number: {
    type: String,
    minLength: 8,
    //  phone number must be 123-123(min 3 digit before and after -) formate
    validate: {
      validator(phoneNumber) {
        if (phoneNumber.includes('-')) {
          const splitDashWord = phoneNumber.split('-');
          //  10-22-334455 invalid || 1-22334455 invalid || 1234556 invalid
          if (splitDashWord.length > 2
            || splitDashWord[0].length < 2
            || splitDashWord[1].length < 1) {
            return false;
          }
        } else if (!phoneNumber.includes('-')) {
          return false;
        }
        return true;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
