import { sendErrorResponse } from './../responses.js';

export const NotFoundHandler = (app) => {
    app.use((req, res, next) => {
        sendErrorResponse("Not Found Route", 404)
    })
}