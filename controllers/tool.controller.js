const {validationResult} =require("express-validator") ;
let tools =require("../data/tools.js")


let getAllTools =(req, res) => {
  res.status(200).json(tools);
}
let getToolById = (req, res) => {
  const toolId = Number(req.params.toolId);

  const tool = tools.find((tol) => tol.id === toolId);

  if (!tool) {
    return res.status(404).json({
      message: "Tool not found",
    });
  }

  res.status(200).json(tool);
}


let createTool = 
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const createdTool = {
      id: tools.length + 1,
      ...req.body,
    };

    tools.push(createdTool);

    res.status(201).json(createdTool);
  }


let editTool =(req, res) => {
  const toolId = Number(req.params.toolId);

  const tool = tools.find((tol) => tol.id === toolId);

  if (!tool) {
    return res.status(404).json({
      message: "Tool not found",
    });
  }

  Object.assign(tool, req.body);

  res.status(200).json(tool);
}


let deleteTool = (req, res) => {
  const toolId = Number(req.params.toolId);

  const toolExists = tools.find((tol) => tol.id === toolId);

  if (!toolExists) {
    return res.status(404).json({
      message: "Tool not found",
    });
  }

  tools = tools.filter((tol) => tol.id !== toolId);

  res.status(204).send();
}



module.exports ={
deleteTool,editTool,createTool,getToolById,getAllTools
}