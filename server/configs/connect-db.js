import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const dbURL = process.env.DB_URL || "";

const connectedDatabase = async () => {
  await mongoose
    .connect(dbURL)
    .then()
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

export default connectedDatabase;
