const express = require("express");
const entityRouter = express();
entityRouter.use(express.json());
const entityController = require("../controllers/entity.controller");

entityRouter.get("/:id", entityController.getEntitiesByTypeId); 
entityRouter.post("/:id", entityController.createEntity);
entityRouter.put("/:id", entityController.updateEntity);
entityRouter.delete("/:id", entityController.deleteEntity);






module.exports = entityRouter;