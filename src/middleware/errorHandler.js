const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);

    // Define error types and their corresponding status codes
    const errorTypes = {
        ValidationError: 400,
        InvalidIdError: 400,
        UnauthorizedError: 401,
        ForbiddenError: 403,
        NotFoundError: 404,
        InternalServerError: 500,
    };

    // Check if the error type is in our defined list, otherwise use InternalServerError
    const errorType = err.name in errorTypes ? err.name : 'InternalServerError';
    const statusCode = errorTypes[errorType];

    // Prepare the error message
    const message = errorType === 'UnauthorizedError' ? 'Invalid token' :
        errorType === 'InternalServerError' ? 'Something went wrong on the server' :
            err.message;

    // Send the error response
    res.status(statusCode).json({ message });
};

export default errorHandler;
