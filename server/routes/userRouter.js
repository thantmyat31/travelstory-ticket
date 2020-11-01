const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../model/user');
const auth = require('./../middlewares/auth');

router.post('/register', async (req, res) => {
	try {
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

        const existingUser = await User.findOne({ email: email });
		if (existingUser)
			return res.status(400).json({
				message: 'An account with this email already exists.'
            });
            
        if (!displayName) displayName = email;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email: email,
            password: passwordHash,
            displayName: displayName
        });

        const userSaved = await newUser.save();
        res.json(userSaved);
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate
        if(!email || !password) 
            return res.status(400).json({
				message: 'Not all fields have been entered.'
            });
            
        const user = await User.findOne({ email: email });
        if(!user)
            return res.status(400).json({
                message: 'No account with this mail has been registered.'
            });

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) 
            return res.status(400).json({
                message: 'Invalid credentials.'
            })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token: token,
            user: {
               id: user._id,
               email: user.email,
               displayName: user.displayName
            }
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

router.delete('/delete', auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

router.post('/isTokenValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        return res.json(true);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

router.get('/', auth,  async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        id: user._id,
        displayName: user.displayName,
        email: user.email
    });
});

module.exports = router;
