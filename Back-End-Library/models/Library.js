const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  numberOfPages: Number,
  publishDate: String,
  rating: Number,
  cover: String,
  synopsis: String
});

module.exports = mongoose.model('Library', LibrarySchema);
