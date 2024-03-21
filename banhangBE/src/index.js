const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routers");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
dotenv.config();
const port = process.env.PORT || 3001;

routes(app);
mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("CONNECT OK");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
