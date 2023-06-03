const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:8082",
};

app.use(cors(corsOptions));

const initRoutes = require("./src/routes");
initRoutes(app);

let port = 8081;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
