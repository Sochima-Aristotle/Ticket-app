const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Can do more, and after it shall make sense" });
});

app.use("/api/users", require("./route/useRoutes"));

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
