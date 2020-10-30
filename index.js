const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const mongodbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env
	.MONGODB_PASSWORD}@mern-boiler-plate.k7h6f.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;

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
app.use(express.json());

// Routes
app.get('/', (req, res) => {
	res.send("I'm root");
});

// Listener
app.listen(PORT, () => console.log(`Listen on PORT ${PORT}`));
