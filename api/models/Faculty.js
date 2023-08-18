const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  password: { type: String, required: true },
  
}, { timestamps: true });

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = { Faculty };