const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;
console.log('s');

// set up static files
app.use(express.static('public'));

// use body-parser middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use((err, req, res, next) => {
	console.log(err); // to see properties of message in our console
	res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(4000, () => {
	console.log('now listening for requests');
});
