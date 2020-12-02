const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expressAgencySchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        maxlength: 70,
        required: true
    },
    email: {
        type: Array,
        trim: true,
        unique: true
    },
    phone: {
        type: Array,
        required: true
    },
}, {
    timestamps: true
})

const ExpressAgency = mongoose.model('ExpressAgent', expressAgencySchema);

module.exports = ExpressAgency;