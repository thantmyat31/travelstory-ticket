const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const City = mongoose.model('City', citySchema);

module.exports = City;