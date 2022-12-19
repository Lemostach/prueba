const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    nickname: String,
    email: String,
    picture: String,
    affiliatedNumber : Number,
    affiliationDate: Date,
    occupation: String,
    birthdate: String,
    neasDiscovered: [Array],
    regDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema)

module.exports = User