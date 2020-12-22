const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = Schema({
    tripId: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    selectedSeats: {
        type: Array,
        required: true
    },
    nationality: {
        type: String,
        default: 'myanmar',
        required: true
    },
    contactInfo: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;