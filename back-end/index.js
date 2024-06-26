const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// Router
const PublishingRoute = require("./routes/Publishing");
const BookRoute = require("./routes/Book");
const AuthRoute = require("./routes/Auth");
const BorrowRoute = require("./routes/BorrowBook");
dotenv.config();
// CONNECT DB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
connectToDatabase();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
// Use Router
app.use(cookieParser());
app.use("/v1/auth", AuthRoute);
app.use("/v1/publishing", PublishingRoute);
app.use("/v1/book", BookRoute);
app.use("/v1/borrow", BorrowRoute);
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
