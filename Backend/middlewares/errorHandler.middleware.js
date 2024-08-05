const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  let errorMessage = err.message || "Internal Server Error";
  let errorTitle = "Error";

  switch (statusCode) {
    case 400:
      errorMessage = err.message || "Validation Failed";
      errorTitle = "Bad Request";
      break;
    case 401:
      errorMessage = err.message || "Unauthorized";
      errorTitle = "Unauthorized";
      break;
    case 403:
      errorMessage = err.message || "Forbidden";
      errorTitle = "Forbidden";
      break;
    case 404:
      errorMessage = err.message || "Not Found";
      errorTitle = "Not Found";
      break;
    case 500:
      errorMessage = err.message || "Server Error";
      errorTitle = "Server Error";
      break;
    default:
      console.log("No Error!! All Good");
      break;
  }

  const errorResponse = {
    title: errorTitle,
    message: errorMessage,
    stackTrace: err.stack || "No stack trace available",
    statusCode: statusCode,
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
