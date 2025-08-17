// testServer.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", todoRoutes);

let server;

const startTestServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    console.log("✅ Test MongoDB connected");

    return new Promise((resolve) => {
      server = app.listen(0, () => { // random free port
        console.log("🚀 Test server running");
        resolve(server);
      });
    });
  } catch (err) {
    console.error("❌ Test DB connection failed:", err);
    throw err;
  }
};

const stopTestServer = async () => {
  await mongoose.connection.close();
  if (server) {
    return new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }
};

export { startTestServer, stopTestServer };
