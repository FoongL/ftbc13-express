const express = require("express");
const cors = require("cors");

// set up dotenv in the root file
require('dotenv').config()

// importing Routers
const UserRouter = require("./routers/userRouter");
const ItemRouter = require("./routers/itemRouter");

// importing controllers
const UserController = require("./controller/userController");
const ItemController = require("./controller/itemController");

// initializing controllers
const userController = new UserController();
const itemController = new ItemController();

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
