const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const morgan = require("morgan");


require('dotenv').config();

const authRouters = require('./app/routes/auth');
const userRouters = require('./app/routes/user');
const agencyRouters = require("./app/routes/agency");
const cityRouters = require("./app/routes/city");
const tripRouters = require('./app/routes/trip');
const ticketRouters = require('./app/routes/ticket');
const exchangeRouters = require('./app/routes/exchange');

const mongodbUrl = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
	})
	.then(() => console.log('[MongoDB Connected]'))
	.catch((error) => console.error("[Database Connection Failed]"));


// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('common'));
app.use('/api', authRouters);
app.use('/api/user', userRouters);
app.use('/api/agency', agencyRouters);
app.use('/api/city', cityRouters);
app.use('/api/trip', tripRouters);
app.use('/api/ticket', ticketRouters);
app.use('/api/exchange', exchangeRouters);

app.use(express.static('./upload/'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
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
