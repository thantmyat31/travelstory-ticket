const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    displayName: {
        type: String,
        minlength: 3,
        maxlength: [30, 'Name is too long!'],
        trim: true,
        required: true
    },
    email: {
        type:String,
        trim:true,
        lowercase: true,
        unique: true,
        required: true
    },
    hashed_password: {
        type:String,
        minlength: 6,
        required: true
    },
    role: {
        type:String,
        default: 'subscriber'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
},{
    timestamps: true
});

userSchema.virtual('password')
    .get(function() {
        return this._password
    })
    .set(function(password) {
        this._password = password;
        this.hashed_password = this.encryptPassword(password);
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return bcrypt.compareSync(plainText, this.hashed_password);
    },
    encryptPassword: function(password) {
        if(!password) return '';
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashed = bcrypt.hashSync(password, salt);
            return hashed;
        } catch (error) {
            return '';
        }
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;