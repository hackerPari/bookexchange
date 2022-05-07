'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const BookSchema = new Schema({
  category: String,
  language: String, 
  subject: String,
  publisher: String,
  name: String, 
  subtitle: String,
  description: String,
  authors: [String],
  edition: String,
  code: String,
  coverPhoto: String,
  count: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('book', BookSchema);