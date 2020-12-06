const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expressAgencySchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        maxlength: 70,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true,
    },
    phones: {
        type: Array,
        required: true,
        default: []
    },
    addresses: {
        type: Array,
        required: true,
        default: []
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

const ExpressAgency = mongoose.model('ExpressAgency', expressAgencySchema);

module.exports = ExpressAgency;