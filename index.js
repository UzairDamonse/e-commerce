// Import needed libraries
const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

// Import routes
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categories");
const orderRoute = require("./routes/orders");
const productRoute = require("./routes/products");

// Configure Server
const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors
app.use(express.static("public"));

// This is where we check URLs and Request methods to create functionality
// GET '/' is always what will be displayed on the home page of your application

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

// Use individual routes when visiting these URLS
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/orders", orderRoute);
app.use("/products", productRoute);

// Set up server to start listening for requests
app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
