const express = require("express");
const entityRouter = express();
entityRouter.use(express.json());
const entityController = require("../controllers/entity.controller");
const reqValidation = require("../middleware/type.middleware");

entityRouter.get("/:id", reqValidation, entityController.getEntitiesByTypeId); 
entityRouter.post("/:id", reqValidation, entityController.createEntity);
entityRouter.patch("/:id",reqValidation, entityController.updateEntity);
entityRouter.delete("/:id",reqValidation, entityController.deleteEntity);
entityRouter.get("/", entityController.getEntryNumberOfEachType);






module.exports = entityRouter;