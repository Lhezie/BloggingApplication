require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const blogRoutes = require("./server/routes/blogRoute")
const authRoutes = require("./server/routes/authRoute")
const mainRoutes = require("./server/routes/main")
const path = require("path");


const app = express();
const PORT = 3000 || process.env.PORT;

// Connect to MongoDB
connectDB();

// Templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use("/", require("./server/routes/main.js"));
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
app.use("", mainRoutes)


// creating server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
