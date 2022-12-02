const express = require("express");
const twilio = require("twilio");
require("dotenv").config();
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./middleware/logger.js"));
app.use("/", require("./router/routers.js"));
app.use(require("./middleware/NotFound.js"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
