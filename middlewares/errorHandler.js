const errorHandler = (error, req, res, next) => {
  return res
    .status(error.statusCode || 500)
    .json({
      status: error.statusMessage || "ERROR",
      message: error.message || "internal server error  ",
    });
};


module.exports = errorHandler;