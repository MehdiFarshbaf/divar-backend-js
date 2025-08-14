import express from "express"
import dotenv from 'dotenv'
import {connectDB} from "./src/config/mongoose.config.js"
import {setupSwagger} from "./src/config/swagger.config.js"
import appRoutes from "./src/app.routes.js";
import {NotFoundHandler} from "./src/common/exception/not-found-handler.js";
import {allExceptionHandler} from "./src/common/exception/all-exception-handler.js";
import cookieParser from "cookie-parser";

dotenv.config()

const main = () => {

    const PORT = process.env.PORT


    const app = express()

    //connect to database
    connectDB()

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser(process.env.COOKIE_SECRET));
    // Setup Swagger
    setupSwagger(app);


    // Routes
    app.use(appRoutes)
    app.get('/', (req, res) => {
        res.send('Hello TypeScript!');
    });

    // Error Handler
    NotFoundHandler(app)
    allExceptionHandler(app)

    app.listen(PORT, () => {
        console.log(`server : http://locallhost:${PORT}`)
        console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    })
}

main()