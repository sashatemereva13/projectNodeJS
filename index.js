import { logMiddleware } from "./src/middleware/middleware.js";
import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/authRoutes.js";
import videoGameRoutes from "./src/routes/videoGamesRoutes.js";
import config from "./src/config/config.js";
import {
  validateApiKeyProduction,
  validateApiKey,
} from "./src/middleware/apiKey.js";
import { initialiseDatabase } from "./src/config/database.js";

const app = express();

await initialiseDatabase();

app.use(cors());

// middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    version: "1.0.0",
    environment: config.nodeEnv,
    endpoints: {
      users: "/users",
      videoGames: "/videogames",
    },
  });
});
// Health check (useful for Render)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// Protected routes (API key required)
// Option 1: Protect all /users routes
app.use("/users", validateApiKey, userRoutes);
app.use("/videogames", validateApiKey, videoGameRoutes);

// Option 2: Only protect in production (easier for development)
// app.use('/users', validateApiKeyProduction, userRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(config.isDevelopment() && { stack: err.stack }),
  });
});

// start the server
// tells express to listen for requests on the specified port
app.listen(config.port, () => {
  console.log(`✅ Server running on http://localhost:${config.port}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(
    `🔒 API Key protection: ${config.apiKey ? "ENABLED" : "DISABLED"}`
  );
  console.log(`\nAPI Endpoints:`);
  console.log(`  GET    /              - Welcome message (public)`);
  console.log(`  GET    /health        - Health check (public)`);
  console.log(`  GET    /users         - Get all users (protected)`);
  console.log(`  GET    /users/:id     - Get user by ID (protected)`);
  console.log(`  POST   /users         - Create new user (protected)`);
  console.log(`  PUT    /users/:id     - Update user (protected)`);
  console.log(`  DELETE /users/:id     - Delete user (protected)`);

  console.log(`****_________________________________________________****`);
  console.log(`                                                    `);
  console.log(`  GET    /videogames         - Get all games (protected)`);
  console.log(`  GET    /videogames/:id     - Get game by ID (protected)`);
  console.log(`  POST   /videogames         - Create new game (protected)`);
  console.log(`  PUT    /videogames/:id     - Update game (protected)`);
  console.log(`  DELETE /videogames/:id     - Delete game (protected)`);
});

export default app;
