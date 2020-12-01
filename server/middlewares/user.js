const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if(!token)
            return res.status(401).json({
                message: 'No authenticated token, authorization denied.'
            });

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if(!verified)
            return res.status(401).json({
                message: 'Token verification failed, authorization denied.'
            });

        req.user._id = verified._id;
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Authentication failed. Try again later.'
        })
    }
}