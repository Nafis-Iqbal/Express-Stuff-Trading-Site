process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ Unhandled Rejection at:", promise, "Reason:", reason);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import redis from './Config/redis';

import router from "./Routes";
import {errorHandler} from "./Middlewares/CustomMiddlewares";

import {sequelize} from "./Models";

const app = express();
dotenv.config();

// // CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies & credentials (use with `origin` set)
};
app.use(cors(corsOptions));

// // CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Only allow content from the same origin
        scriptSrc: ["'self'", "https://trusted.cdn.com"], // Allow scripts from self and a trusted CDN
        styleSrc: ["'self'", "https://trusted.cdn.com"], // Allow styles from self and a trusted CDN
        imgSrc: ["'self'", "data:", "https://images.example.com"], // Allow images from self and a trusted domain
        connectSrc: ["'self'", "https://api.example.com"], // Allow API requests only to trusted domains
      },
    },
    frameguard: { action: "deny" }, // Prevents clickjacking
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // Controls referrer information sent with requests
    xssFilter: true, // Enables XSS protection (deprecated, but useful for older browsers)
    noSniff: true, // Prevents MIME-type sniffing
    hidePoweredBy: true, // Hides the "X-Powered-By: Express" header
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Enforces HTTPS for one year
    ieNoOpen: true, // Blocks downloads from being opened automatically in IE
  })
);

// // Middleware
app.use(express.json());

// // Routes
app.use("/api", router);

// // Error Handlers
app.use(errorHandler);

// // Redis Server
// redis.set('mykey', 'hello world', 'EX', 60); // Setting with an expiration time of 60 seconds

// redis.get('mykey', (err, result) => {
//   if (err) {
//     console.error('Error fetching value:', err);
//     return;
//   }
//   console.log('Value from Redis:', result); // Should output 'hello world'
// });

// redis.publish('myChannel', 'Hello, Redis!');

// Connect to database
sequelize.sync()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB error:", err));

export default app;
