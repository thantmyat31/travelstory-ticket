const User = require("./../model/user");

exports.getAllUsers = (req, res) => {
    User.find((error, users) => {
        if(error || !users) return res.status(400).json({
            message: 'Request failed to get all users.'
        })
        const allUsers = users.map((user) => {
            return {_id: user._id, displayName: user.displayName, email: user.email, role: user.role};
        })
        return res.status(200).json(allUsers);
    })
}

exports.updateRole = (req, res) => {
    const { id } = req.params;
    const { newRole } = req.body;
    User.findOneAndUpdate({ _id: id }, { role: newRole }, { new: true })
        .exec((error, result) => {
            if(error || !result) return res.status(401).json({
                message: 'You cannot update user role for now. Try again.'
            });

            return res.json({
                _id: result.id,
                email: result.email,
                displayName: result.displayName,
                role: result.role
            });
        })
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .exec((error, deletedUser) => {
            if(error || !deletedUser) return res.status(500).json({
                message: 'User could not be deleted.'
            })
            console.log(deletedUser);
            return res.json(deletedUser);
            
        })  
}

exports.getUserById = (req, res) => {
    User.findById(req.userId)
        .exec((error, user) => {
            if(error || !user) {
                return res.status(400).json({
                    message: 'User not found.'
                })
            } else {
                res.json({
                    _id: user._id,
                    displayName: user.displayName,
                    email: user.email,
                    role: user.role
                });
            }
        })
    
}