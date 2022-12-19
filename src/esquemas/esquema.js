const mongoose = require('mongoose')

const nasaSchema = new mongoose.Schema({
    name:  String,
    id: Number,
    nametype: String,
    recclass: String,
    mass: Number,
    fall: String,
    year: String,
    reclat: Number,
    reclong: Number,
    geolocation: Object,
    regDate: { type: Date, default: Date.now }
});

const Landing = mongoose.model('Landing', nasaSchema)

module.exports = Landing