const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const { User } = require('./model/user');

const mongodbUrl = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 2020;

// Database connection
mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('[MongoDB Connected]'))
	.catch((error) => console.error("[Database Connection Established]"));


// Middlewares
app.use(express.json());
app.use(cors());
app.use('/users', require('./routes/userRouter'));


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
