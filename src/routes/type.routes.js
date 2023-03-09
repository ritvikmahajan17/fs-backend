const express = require("express");
const typeRouter = express();
typeRouter.use(express.json());
const typeController = require("../controllers/type.controller");


typeRouter.get("/all", typeController.getAllTypes);
typeRouter.get("/:name", typeController.getTypeByName);
typeRouter.post("/", typeController.createType);
typeRouter.get("/:name/fields", typeController.getFields);
typeRouter.put("/:name", typeController.updateField);
typeRouter.put("/editField/:name", typeController.editField);
typeRouter.delete("/:name", typeController.deleteField);
typeRouter.delete("/delType/:name", typeController.deleteType);


module.exports = typeRouter;