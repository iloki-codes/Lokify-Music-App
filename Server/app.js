require("dotenv").config();
require("express-async-errors");
// require("./models/user.js");

const express = require('express');
const app = express();

const cors = require('cors');

const connection = require("./config/index.js");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");

connection();
app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

