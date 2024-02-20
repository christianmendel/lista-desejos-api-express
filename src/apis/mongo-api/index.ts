import { MongoClient } from "mongodb";
require("dotenv").config();

const mongoClient = new MongoClient(process.env.MONGO_URI ?? "");

export function getMongoClient() {
  return mongoClient;
}
