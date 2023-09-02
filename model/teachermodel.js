const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  subject: {
    type: [String], 
    required: false
  },
  department: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);