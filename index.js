// importing required packages
const express = require("express");
const cors = require("cors");
const pg = require("pg");

// set up dotenv in the root file
require("dotenv").config();

// set up DB Connection
const { Pool } = pg;

const pgConnectionConfigs = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT, // Postgres server always runs on this port
};

const pool = new Pool(pgConnectionConfigs);

// importing Routers
const UserRouter = require("./routers/userRouter");
const ItemRouter = require("./routers/itemRouter");

// importing controllers
const UserController = require("./controller/userController");
const ItemController = require("./controller/itemController");

// initializing controllers
const userController = new UserController({ tblName: "users", pool });
const itemController = new ItemController({ tblName: "items", pool });

// initializing Routers
const userRouter = new UserRouter(userController);
const itemRouter = new ItemRouter(itemController);

const app = express();
const corsOptions = {
  origin: "localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using routers
app.use("/users", userRouter.routes());
app.use("/items", itemRouter.routes());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
