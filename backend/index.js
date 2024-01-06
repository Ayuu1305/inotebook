const connetTomongo = require("./db");
const express = require("express");

connetTomongo();
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Ayush!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
