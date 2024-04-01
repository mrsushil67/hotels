const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config()

//const mongoUrl = process.env.db_url
const mongoUrl = "mongodb://127.0.0.1:27017"

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database connected ...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

app.use(express.json());

app.get("/",(req,res)=>{
  res.send("welcome to our server \n ")
})

const personRoutes = require("./routes/personRoutes")
const menuRoutes = require("./routes/menuRoutes")

app.use("/person",personRoutes)
app.use("/menu",menuRoutes)

app.listen(3300,() => console.log("server is running......"));
