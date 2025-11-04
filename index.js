import { logMiddleware } from "./src/middleware/middleware.js";
import express from "express";
const app = express();
const PORT = 3000;

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Dave" },
];

// middleware to parse JSON bodies
app.use(express.json());

// defines the route for GET requests
app.get("/", logMiddleware, (req, res) => {
  const data = req.data;
  res.json({ users, data });
});

app.post("/", (req, res) => {
  console.log(req);
});

// start the server
// tells express to listen for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
