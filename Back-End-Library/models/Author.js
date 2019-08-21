const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  author: String,
  birthday: String,
  favColor: String,
  booksAuthored: [],
});

module.exports = mongoose.model('Author', AuthorSchema);

