const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1
    },
    password: {
        type:String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
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

userSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return err;
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, callBack) {
    const user = this;
    bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
        if(err) return callBack(err);
        if(isMatch) return callBack(null, isMatch);
    });
}

userSchema.methods.generateToken = function(callBack) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save((err, user) => {
        if(err) return callBack(err);
        callBack(null, user);
    })
}

userSchema.statics.findByToken = function(token, callBack) {
    const user = this;
    jwt.verify(token, 'secret', (err, decode) => {
        user.findOne({"_id":decode, "token":token}, (err, user) => {
            if(err) return callBack(err);
            callBack(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };