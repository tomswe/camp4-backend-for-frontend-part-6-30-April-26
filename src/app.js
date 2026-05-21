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

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN || true,
//     credentials: true,
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
//   }),
// );

// multiple origins
const allowedOrigins =
  // process.env.CORS_ORIGIN?.split(",").map((o) => o.trim()) || [];
  ["http://localhost:5173", "https://camp4-fe-handson.vercel.app/"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // allow requests with no origin (mobile apps, curl, Postman)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) return callback(null, true);
//       callback(new Error(`CORS blocked: ${origin}`));
//     },
//     credentials: true,
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// app.options("{*path}", cors()); // preflight

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//   }),
// );

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
