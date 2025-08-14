export const sendErrorResponse = (message, statusCode) => {
    const error = new Error(message)
    error.statusCode = statusCode
    throw error
}

export const sendSuccessResponse = (res, statusCode, data = undefined, message = "عملیات موفقیت آمیز بود.", success = true) => {
    res.status(statusCode).json({
        success,
        message,
        data
    })
}