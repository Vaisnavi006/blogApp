//instance of express framework
const express = require("express");

//take instance of server named app
const app = express();

//used to load environment variables from a .env file into the process.env object
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
const blog = require("./routes/blog")

//mount url
app.use("/api/v1", blog);

//establish connection with database
const connectWithDb = require("./config/database");
connectWithDb();

//Activate the server
app.listen(PORT, () => {
    console.log(`App is started at Port no ${PORT}`);
})

app.get("/", (req,res) => {
    res.send(`<h1>This is my homepage</h1>`)
})