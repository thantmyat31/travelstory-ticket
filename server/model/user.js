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
        type:Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;