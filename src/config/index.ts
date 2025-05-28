import { config as _config } from "dotenv";

_config();

import app from "./app";
import db from "./db";
import jwt from "./jwt";
import mailer from "./mailer";
import cloudinary from "./cloudinary";

const config = {
    app,
    db,
    jwt,
    mailer,
    cloudinary,
};

export default config;
