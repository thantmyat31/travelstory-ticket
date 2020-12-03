const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = Schema({
    agency: {
        type: Schema.Types.ObjectId,
        ref: 'ExpressAgency'
    },
    name: {
        type: String,
        required: true
    },
    bus_number: {
        type: String,
        required: true
    },
    trip_code: {
        type: String,
        required: true
    },
    bus_type: {
        type: String,
        default: 'Normal',
        required: true
    },
    city_from: {
        type: Array,
        required: true
    },
    city_to: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;