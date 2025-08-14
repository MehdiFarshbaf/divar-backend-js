export const allExceptionHandler = (app) => {
    app.use((err, req, res, next) => {
        let status = err?.status ?? err?.statusCode ?? err?.code
        if (!status || isNaN(+status) || status > 511 || status < 200) status = 500
        const data = err.data
        const errors = err.errors || undefined
        const message = err?.message ?? err?.stack ?? "Internal Server Error"
        res.status(status).json({
            message, data, success: false, errors
        })
    })
}