const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    displayName: {
        type: String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1,
        required: true
    },
    password: {
        type:String,
        minlength: 5,
        required: true
    },
    role: {
        type:String,
        default: 'subscriber'
    },
    token: {
        type: String
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;