const successResponse = (res, message, data = null) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message, error = null) => {
  res.status(500).json({
    success: false,
    message,
    error,
  });
};

module.exports = { successResponse, errorResponse };
