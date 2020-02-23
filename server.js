// Import packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");

const MONGODB_URI =
	"mongodb+srv://mschlipf:mekong23@react-kanban-jehyd.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI || "mongodb://localhost/react-kanban", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
	console.log("Mongoose is connected.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(morgan("tiny"));

app.use("/api", routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
