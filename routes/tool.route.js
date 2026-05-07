const express= require("express");
const validation = require("../middlewares/tool.validateSchema.js")
const router =express.Router();
const toolControllers = require("../controllers/tool.controller.js")


router.route('/').get(toolControllers.getAllTools).post(validation(),toolControllers.createTool)
router.route("/:toolId").get(toolControllers.getToolById).delete(toolControllers.deleteTool).patch(toolControllers.editTool)



module.exports= router;