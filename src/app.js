import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import logger from "./middleware/logger.js";
import dotenv from "dotenv";
import todoRoutes from "./modules/todo/todoRoute.js";
import { xss } from "express-xss-sanitizer";
import authRoutes from "./modules/auth/authRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const isTest = process.env.NODE_ENV === "development";
const allowedOrigins =
  process.env.CORS_ORIGIN?.split(",").map((o) => o.trim()) || [];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests tanpa origin contoh: Postman, mobile apps, curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },

    credentials: true,

    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options(/.*/, cors());

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isTest ? 10000 : 100,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(xss());
app.use(logger);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;
