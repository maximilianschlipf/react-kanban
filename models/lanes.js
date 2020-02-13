const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const LanesSchema = new Schema([
	{
		id: String,
		title: String,
		tasks: [
			{
				id: String,
				title: String,
				status: String,
				description: String,
				priority: String
			}
		]
	}
]);

const Lane = mongoose.model("Lanes", LanesSchema);

module.exports = Lane;
