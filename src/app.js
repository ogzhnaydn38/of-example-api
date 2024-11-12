const express = require("express");
const app = express();
const routes = require("./routes");

const { errorConverter, errorHandler } = require("./middlewares/error");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// v1 api routes
app.use("/api/", routes);

app.get("/*", (req, res) => {
  res.send("hello, this is yes.tools generated app");
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
