const mongoose = require('mongoose');

const {Schema} = mongoose;

let addSuperUser = new Schema({

    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    organization: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

},{collection: "superUsers"})

    module.exports = mongoose.model('superUsers',addSuperUser);