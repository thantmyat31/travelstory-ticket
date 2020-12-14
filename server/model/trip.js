const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = Schema({
    agency: {
        type: Schema.Types.ObjectId,
        ref: 'ExpressAgency'
    },
    busNumber: {
        type: String,
        required: true
    },
    tripName: {
        type: String,
        required: true
    },
    tripCode: {
        type: String,
        required: true
    },
    trips: {
        type: Array,
        required: true
    },
    busType: {
        type: String,
        default: 'Normal',
        required: true
    },
    seatsList: {
        type: Object,
        required: true
    },
    depart: {
        type: Object,
        required: true
    },
    arrive: {
        type: Object,
        required: true
    },
    price: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;