import cors from "cors";
import express from "express";
import runAutoInserts from "./apis/mongo-api/insert";
import routes from "./routes";
import { logger } from "./utils/log/logger";
require("dotenv").config();

const app = require("express")();
const http = require("http").Server(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(routes);

app.use(express.json({ limit: "6MB" }));
app.use(express.urlencoded({ extended: true, limit: "6MB" }));

const initMongo = async () => {
  await runAutoInserts();
};

http.listen(8000, async () => {
  await initMongo();
  logger.info(`Server started on port: ${8000}`);
});
