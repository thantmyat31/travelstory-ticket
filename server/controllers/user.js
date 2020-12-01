const User = require("./../model/user");

exports.getUserById = (req, res) => {
    User.findById(req.user._id)
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