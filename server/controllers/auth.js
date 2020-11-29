const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../model/user');

exports.register = (req, res) => {

    let { email, password, confirmPassword, displayName } = req.body;

    // Validate
    if (!email || !password || !confirmPassword)
        return res.status(400).json({
            message: 'Not all fields have been entered.'
        });

    if (password.length < 5)
        return res.status(400).json({
            message: 'The password needs to be atleast 5 charactors long.'
        });

    if (password !== confirmPassword)
        return res.status(400).json({
            message: 'Enter the same password twice for verification.'
        });

    if (!displayName) displayName = email;

    User.findOne({ email: email })
        .exec((error, user) => {
            if (user) {
                return res.status(400).json({
                    message: 'An account with this email already exists.'
                });
            } else {
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                const newUser = new User({
                    email: email.toLowerCase(),
                    password: passwordHash,
                    displayName: displayName
                });

                newUser.save((error, createdUser) => {
                    if(error || !createdUser) return res.status(400).json({
                        message: 'Registration failed. Try again'
                    })

                    const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);
                
                    return res.status(201).json({
                        token: token,
                        user: {
                            _id: createdUser._id,
                            email: createdUser.email,
                            displayName: createdUser.displayName,
                            role: createdUser.role
                        }
                    });
                })
            }
        })    
}

exports.login = (req, res) => {
        const { email, password } = req.body;

        // Validate
        if(!email || !password) {
            return res.status(400).json({
				message: 'Not all fields have been entered.'
            });
        }
            
        User.findOne({ email: email })
            .exec((error, user) => {
                if(error || !user) {
                    return res.status(400).json({
                    message: 'No account with this mail has been registered.'
                    });
                } else {
                    const isMatch = bcrypt.compareSync(password, user.password);
                    
                    if(!isMatch) {
                        return res.status(400).json({
                            message: 'Invalid credentials.'
                        })
                    } else {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                        return res.json({
                            token: token,
                            user: {
                                _id: user._id,
                                email: user.email,
                                displayName: user.displayName,
                                role: user.role
                            }
                        })
                    }
                }
            })
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.user)
        .exec((error, deletedUser) => {
            if(error || !deletedUser) {
                return res.status(500).json({
                    message: 'User could not be deleted.'
                })
            } else {
                return res.json({
                    message: 'User was deleted successfully.'
                })
            }
        })  
}


exports.isTokenValid = (req, res) => {
    const token = req.header('x-auth-token');
    if(!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified) return res.json(false);

    User.findById(verified.id)
        .exec((error, user) => {
            if(error || !user) return res.json(false);
            return res.json(true);
        })
}


exports.getUserById = (req, res) => {
    User.findById(req.user)
        .exec((error, user) => {
            if(error || !user) {
                return res.status(400).json({
                    message: 'User not found.'
                })
            } else {
                res.json({
                    _id: user._id,
                    displayName: user.displayName,
                    email: user.email
                });
            }
        })
    
}