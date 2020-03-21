const express = require('express');
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

app.get("/", (req,res) => res.send("API is running"));

// Define Routes
app.use("/api/users",require('./routes/api/user'));
app.use("/api/auth",require('./routes/api/auth'));
app.use("/api/blog",require('./routes/api/blog'));
app.use("/api/product",require('./routes/api/product'));
app.use("/api/productReview",require('./routes/api/productReview'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server is runnig on port ${PORT}`))