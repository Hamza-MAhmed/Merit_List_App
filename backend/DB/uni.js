// models/University.js
const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  departments: [
    {
      name: String,
      years: [
        {
          year: Number,
          merit: Number
        }
      ]
    }
  ]
});

module.exports = mongoose.model('University', universitySchema);
