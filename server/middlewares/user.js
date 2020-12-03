const jwt = require('jsonwebtoken');
const User = require("./../model/user");

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

        req.userId = verified._id;
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Authentication failed. Try again later.'
        })
    }
}


// admin middleware
exports.adminMiddleware = (req, res, next) => {
    User.findById(req.userId)
        .exec((error, user) => {
            if(error || !user) return res.status(400).json({
                error: 'User not found.'
            });

            if(user.role !== 'admin') return res.status(400).json({
                error: 'Admin resource. Access denied.'
            });

            req.profile = user;
            next();
        })
}

// agency middleware
exports.agencyMiddleware = (req, res, next) => {
    User.findById(req.userId)
        .exec((error, user) => {
            if(error || !user) return res.status(400).json({
                error: 'User not found.'
            });

            if(user.role !== 'admin' || user.role !== 'agency') return res.status(400).json({
                error: 'Agency resource. Access denied.'
            });

            req.profile = user;
            next();
        })
}
