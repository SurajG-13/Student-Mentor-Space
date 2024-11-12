class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something Went Wrong",
    error = [],
    stack = ""
  ) {
    super(message); // Call the parent (Error) constructor with the message

    this.statusCode = statusCode; // Custom property to hold the status code
    this.data = null; // Default value for data, you can customize this if needed
    this.message = message; // Store the message
    this.success = false; // Indicate failure by default
    this.errors = error; // Store errors passed to the constructor

    // If a stack trace is provided, use it, else capture the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
  }
}

export { ApiError };
