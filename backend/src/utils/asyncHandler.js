const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next); // Await the handler
    } catch (err) {
      next(err); // Forward any errors to the error-handling middleware
    }
  };
};

export { asyncHandler };

// const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };

// export { asyncHandler };
