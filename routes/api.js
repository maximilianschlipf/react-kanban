const express = require("express");

const router = express.Router();

const Lane = require("../models/lanes");

router.get("/", (req, res) => {
	Lane.find({})
		.then(data => {
			res.json(data);
		})
		.catch(error => {
			console.log("Error: ", error);
		});
});

router.post("/save", (req, res) => {
	const data = req.body;
	const newLane = new Lane();
	newLane.collection.insertMany(data, err => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			res.send("Multiple docs inserted");
		}
	});
});

router.put("/put", (req, res) => {
	const data = req.body;
	Lane.deleteMany({}, err => {
		if (err) {
			console.log(err);
			res.send(err);
		}
	});
	Lane.insertMany(data, err => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			res.send("Multiple docs updated");
		}
	});
});

module.exports = router;
