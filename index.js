import { logMiddleware } from "./src/middleware/middleware.js";
import express from "express";
import userRoutes from "./src/routes/authRoutes.js";
import { initialiseDatabase } from "./src/config/database.js";

const app = express();
const PORT = 3000;

initialiseDatabase();

// middleware to parse JSON bodies
app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    endpoints: {
      users: "/users",
    },
  });
});

// defines the route for GET requests
// app.get("/", logMiddleware, getAllUsers);
// app.get("/users", getAllUsers);
// app.get("/users/:id", getUserById);
// app.post("/users", createUser);

// start the server
// tells express to listen for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("API Documentation:");
  console.log("GET /users - Retrieve all users");
  console.log("GET /users/:id - Retrieve a user by ID");
  console.log("POST /users - Create a new user");
  console.log("PUT /users/:id - Update a user by ID");
  console.log("DELETE /users/:id - Delete a user by ID");
});
