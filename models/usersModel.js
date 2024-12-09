const mongoose = require('mongoose');

const {Schema} = mongoose;

let addUser = new Schema({
    suserID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: false
    },
    number: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

},{collection: "users"})

    module.exports = mongoose.model('users',addUser);