'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ExchangeRequest = new Schema({
    user1: {type: ObjectId, ref: 'user'},
    book1: {type: ObjectId, ref: 'book'},
    point1: Number,
    user2: {type: ObjectId, ref: 'user'},
    book2: {type: ObjectId, ref: 'book'},
    point2: Number,
    requestStatus: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('exchangeRequest', ExchangeRequest);