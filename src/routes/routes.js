const express = require("express");
const tempRouter = express();
tempRouter.use(express.json());
const controller = require("../controllers/controller");


tempRouter.get("/", controller.getHelloWorld);
tempRouter.get("/data", controller.getData);
tempRouter.post("/data", controller.addData);
tempRouter.post("/cart", controller.addToCart);



module.exports = tempRouter;