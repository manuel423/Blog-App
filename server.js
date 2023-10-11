// Import required modules
require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routeAPI = require("./routes/index.js");
const connectDb = require("./config/db").connectDb;

// Connect to MongoDB
connectDb()
  .then((res) => console.log("connected"))
  .catch((e) => console.log(e));

// Create Express app
const app = express();

// Use middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my Blog App! use /api/v1 to access the endpoints");
});
// Define routes
app.use("/api/v1", routeAPI);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Amans's Server is listening on port ${port}`);
});
