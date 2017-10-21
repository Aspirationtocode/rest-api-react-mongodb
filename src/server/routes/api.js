const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/ninjas', (req, res, next) => {
	Ninja.find({}).then(ninjas => {
		res.send(ninjas);
	});
	// const options1 = {
	// 	type: 'Point',
	// 	coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
	// };
	// const options2 = { maxDistance: 100000, spherical: true };
	// const geoNinjasPromise = Ninja.geoNear(options1, options2);
	//
	// geoNinjasPromise
	// 	.then(ninjas => {
	// 		console.log(ninjas);
	// 		res.send(ninjas);
	// 	})
	// 	.catch(next);
});

// add a new ninja to the db
router.post('/ninjas', (req, res, next) => {
	Ninja.create(req.body)
		.then(ninja => {
			res.send(ninja);
		})
		.catch(next);
});

// update a ninja in the db
router.put('/ninjas/:id', (req, res, next) => {
	Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
		.then(() => {
			Ninja.findOne({ _id: req.params.id }).then(ninja => {
				res.send(ninja);
			});
		})
		.catch(next);
});

// delete a ninja from the db
router.delete('/ninjas/:id', (req, res, next) => {
	Ninja.findByIdAndRemove({ _id: req.params.id })
		.then(ninja => {
			res.send(ninja);
		})
		.catch(next);
});

module.exports = router;
