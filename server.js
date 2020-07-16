const db = require("./config/keys").mongoURI;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

const items = require("./routes/api/items");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

//Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

//Use Routes
app.use("/api/items", items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'producion') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started ${port}`));
