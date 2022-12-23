const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "sucess",
    message: "tours-mada static files",
  });
});

const PORT = process.env.PORT || 3100;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
