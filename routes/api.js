const express = require("express");

const router = express.Router();

const Lane = require("../models/lanes");

router.get("/", (req, res) => {
	Lane.find({})
		.then(data => {
			res.json(data);
			console.log("Get it!");
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
			res.send(err)
		} else {
			console.log("Multiple docs inserted");
			res.send("Multiple docs inserted")
		}
	});
});

module.exports = router;
