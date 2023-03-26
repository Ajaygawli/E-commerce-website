const express = require("express");

const app = express();
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error");

app.use(express.json())
app.use(cookieParser());

// Route Imports  

const product = require("./routes/productRoute");

//user 
const user = require("./routes/userRoute");
app.use("/api/v1" , product);
app.use("/api/v1", user );


// Middle Ware for error  
app.use(errorMiddleware);



module.exports = app;