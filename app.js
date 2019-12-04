const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dbConfig = require("./config/database.config");
const note = require("./routes/note.route");
const company = require("./routes/company.route");

const app = express();
const port = 3000;

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log("Error ", err);
    process.exit();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/note", note);
app.use("/company", company);

app.listen(port, () => console.log(`Listening on port ${port}!`));
