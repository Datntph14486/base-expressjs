import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import httpStatus from "http-status";
import morgan from "morgan";

import config from "./config";
import AppDataSource from "./db/dataSource";
import errorHandler from "./middlewares/errorHandler";
import initRoutes from "./routes";
import ApiError from "./utils/ApiError";
import cache from "./utils/cache";

const app = express();

// Helmet
app.use(helmet());

// CORS
app.use(
    cors({
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    })
);

// JSON
app.use(express.json());

// URL encode
app.use(express.urlencoded({ extended: true }));

// morgan
app.use(morgan("dev"));

// Compress
app.use(compression());

// init routes
initRoutes(app);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.METHOD_NOT_ALLOWED, httpStatus["405_NAME"]));
});

// handle error
app.use(errorHandler);

app.listen(config.app.port, () => {
    console.log(`Listen on http://localhost:${config.app.port}`);

    // connect db
    AppDataSource.initialize()
        .then(() => {
            console.log("DB was connected.");
        })
        .catch((err) => {
            console.error("Connect to DB failure, error:", err);
        });
});
