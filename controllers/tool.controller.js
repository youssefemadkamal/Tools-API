const { validationResult } = require("express-validator");
const toolModel = require("../models/tool.model");
const appError = require("../utils/appError.js");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const statusMessages = require("../utils/statusMessages");

let getAllTools = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = parseInt(query.limit) || 2;

  const page = parseInt(query.page) || 1;

  const skip = (page - 1) * limit;

  const tools = await toolModel.find().limit(limit).skip(skip);

  res.status(200).json({
    status: statusMessages.SUCCESS,
    data: tools,
  });
});

let getToolById = asyncWrapper(async (req, res) => {
  const toolId = req.params.toolId;

  const tool = await toolModel.findById(toolId);

  if (!tool) {
    throw new appError(404, statusMessages.FAIL, "tool not found");
  }

  res.status(200).json({
    status: statusMessages.SUCCESS,
    data: tool,
  });
});

let createTool = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorString = JSON.stringify(errors.array());
    throw new appError(400, statusMessages.FAIL, errorString);
  }

  const createdTool = await toolModel.create(req.body);

  res.status(201).json({
    status: statusMessages.SUCCESS,
    data: createdTool,
  });
});

let editTool = asyncWrapper(async (req, res) => {
  const tool = await toolModel.findByIdAndUpdate(req.params.toolId, req.body, {
    new: true,
  });

  if (!tool) {
    throw new appError(404, statusMessages.FAIL, "tool not found");
  }

  res.status(200).json({
    status: statusMessages.SUCCESS,
    data: tool,
  });
});

let deleteTool = asyncWrapper(async (req, res) => {
  const deletedTool = await toolModel.findByIdAndDelete(req.params.toolId);

  if (!deletedTool) {
    throw new appError(404, statusMessages.FAIL, "tool not found");
  }

  res.status(204).send();
});

module.exports = {
  deleteTool,
  editTool,
  createTool,
  getToolById,
  getAllTools,
};
