const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangeSchema = Schema({
    dollarXR: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;