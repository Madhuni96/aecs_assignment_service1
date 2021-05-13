const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./API/router");

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.use(morgan("dev"));

dotenv.config(); // configure the env file

mongoose.connect(
    process.env.MONGO_CONNECTION,
    {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        console.log("***Database is not connected***" + err);
      } else {
        console.log("***Database is connected***");
        console.log("");
      }
    }
  );

  app.use("/", router);

  app.get("/", (req, res) => {
    res.send("Welcome to the AECS Assignment Service 1");
  });
  
  const PORT = process.env.PORT || 3000;
  var server = app.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log("***Server listening at http://%s:%s***", host, port);
  });

  module.exports = app;
  