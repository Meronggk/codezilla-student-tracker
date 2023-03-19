const cors = require("cors");
import express from "express";
import cookieSession from "cookie-session";
import apiRouter from "./api";
import config from "./utils/config";
let bodyParser = require("body-parser");
import {
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware";

const apiRoot = "/api";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({ name: "session", keys: ["hgkhghdhhhhhh"] }));
app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, apiRouter);

app.use("/health", (_, res) => res.sendStatus(200));
app.use(clientRouter(apiRoot));

app.use(logErrors());

//coockei session and authenticate user
/* eslint-disable no-undef */

//----------------------------------------------------------------------
export default app;
