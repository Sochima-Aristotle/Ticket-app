const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 8000;

// connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Message coming from server backend:5000" });
});

app.use("/api/users", require("./route/useRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
