const User = require('./../model/user');
const jwt = require('jsonwebtoken');
const sgMail = require("@sendgrid/mail");

exports.register = (req, res) => {
    let { email, password, displayName } = req.body;

    User.findOne({ email })
        .exec((error, user) => {
            if(error) return res.status(400).json({
                message: 'Failed to create new account. Try again later.'
            });

            if (user) return res.status(400).json({
                    message: 'An account with this email already exists.'
            });
            

            const token = jwt.sign({ displayName, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });
            
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const emailData = {
            to: email,
            from: process.env.EMAIL_FROM, 
            subject: 'Account Activation Link',
            html: `
                <div style="padding:50px;">
                    <h1 style="text-align:center;padding-bottom:15px;border-bottom:1px solid #ddd;">Just one More step.</h1>
                    <h3>Please use the following link to activate your account.</h3>
                    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                    <hr />
                    <p>This email may contain sensitive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                </div>
            `,
            };

            sgMail.send(emailData)
                .then(sent => {
                    return res.json({
                        message: `Email has sent to ${email}. Follow the instruction to activate your account.`
                    });
                })
                .catch(error => {
                    console.log("Error occurs when sending email", error);
                    return res.json({
                        message: 'Error occurs when sending email.'
                    })
                })            
        })  
}

exports.accountActivation = (req, res) => {
    const { token } = req.body;

    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (error, decoded) => {
            if(error) {
                console.log('JWT verify in account activation error', error);
                return res.status(401).json({
                    message: 'Expired link. Signup again.'
                });
            }

            const { displayName, email, password } = jwt.decode(token);
            const newUser = new User({ displayName, email, password });

            newUser.save((error, createdUser) => {
                if(error || !createdUser) return res.status(400).json({
                    message: 'Account activation failed. Try again.'
                })

                const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
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
        })
    }

}

exports.login = (req, res) => {
        const { email, password } = req.body;
            
        User.findOne({ email: email })
            .exec((error, user) => {
                if(error || !user) {
                    return res.status(400).json({
                    message: 'No account with this mail has been registered.'
                    });
                } else {
                    if(!user.authenticate(password)) {
                        return res.status(400).json({
                            message: 'Invalid credentials.'
                        })
                    } else {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
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

exports.isTokenValid = (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if(!token)
            return res.status(401).json({
                message: 'invalid'
            });

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if(!verified)
            return res.status(401).json({
                message: 'invalid'
            });

        User.findById(verified._id)
            .exec((error, user) => {
                if(error || !user) return res.status(401).json({
                    message: 'invalid'
                })

                return res.json({
                    message: 'valid'
                })
            })
        
        
    } catch (error) {
        res.status(500).json({
            message: 'invalid'
        })
    }
}