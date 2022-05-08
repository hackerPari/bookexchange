'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
    name: String,
    enabled: {type: Boolean, default: true},
    username: String,
    password: String,
    salt: String,
    role: String,
    profileImage: String,
    invalidateTokenAt: Date,
    points: Number,
    booksOwned: [{
        'book': {type: ObjectId, ref: 'book'}, 
        'count': Number, name: String, 
        'givenCount': Number
    }],
    booksOwed: [{
        'book': {type: ObjectId, ref: 'book'}, 
        name: String, 
        'owner': {type: ObjectId, ref:'user'},
        ownerName: String, 
        date: Date
    }],
    bookRequests: [{
        'book': {type: ObjectId, ref: 'book'},
        name: String, 
        date: Date
    }],
    booksLent: [{
        'book': {type: ObjectId, ref: 'book'}, 
        name: String, 
        'borrower': {type: ObjectId, ref:'user'}, 
        borrowerName: String, 
        date: Date
    }],
    favoriteCategories: [String]
}, {
    strict: false,
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema);