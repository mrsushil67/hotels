const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
  },
  salary: {
    type: Number,
  },
  address: String,
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  }
});



const personSchema = mongoose.model("Person", schema);

module.exports = personSchema;
