const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { User } = require('./model/user');
const { auth } = require('./middlewares/auth');

require('dotenv').config();

const mongodbUrl = process.env.MONGODB_URI;

mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('connected'))
	.catch((error) => console.error(error));

const app = express();
const PORT = process.env.PORT || 2020;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
	res.send("I'm root");
});

app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })
})

app.post('/api/users/register', (req, res, next) => {
    const user = new User(req.body);

    user.save((err, userData)=> {
        if(err) return next(err);

        res.status(200).json({
            message: 'registered',
            data: userData
        });
    });
    
});

app.post('/api/user/login', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        
        if(!user) return next(err);

        user.comparePassword(req.body.password, (err, isMatch) => {
            console.log("error", err);
            console.log('isMatch', isMatch);
            if(!isMatch) return next(err);
        });

        user.generateToken((err, user) => {
            if(err) return next(err);
            
            res
                .cookie("x_auth", user.token)
                .status(200)
                .json({
                    message: 'login success!'
                })
        });
    })
});

app.get("/api/user/logout", auth, (req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, doc) => {
        if(err) return next(err);
        return res.status(200).send({
            success: true
        })
    })
})


app.use((err, req, res, next) => {
    if(err.message) {
        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production'? '@-@': err.stack
        });
    } else {
        res.json({
            message: err
        })
    }
});

// Listener
app.listen(PORT, () => console.log(`Listen on PORT ${PORT}`));
