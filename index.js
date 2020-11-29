const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

require('dotenv').config();

const mongodbUrl = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 8000;

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
app.use('/api/user', require('./server/routes/userRouter'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}


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
