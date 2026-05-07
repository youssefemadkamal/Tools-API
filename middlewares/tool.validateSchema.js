const { body } = require("express-validator");

const validation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
  ];
};

module.exports = validation;