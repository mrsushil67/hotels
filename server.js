const express = require("express");
const app = express();
const mongoose = require("mongoose");
const personRoutes = require("./routes/personRoutes")
const menuRoutes = require("./routes/menuRoutes")



mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => {
    console.log("Database connected ...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });


// const bodyParser = require("body-parser")
app.use(express.json());

app.use("/person",personRoutes)
app.use("/menu",menuRoutes)

app.listen(3300, () => console.log("server is running......"));
