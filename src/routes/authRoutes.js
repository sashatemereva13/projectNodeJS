import express from "express";
import { logMiddleware } from "../middleware/middleware.js";
import * as userController from "../controllers/authController.js";

const router = express.Router();

// paths are relative '/' instead of '/users'
// the full path is determined in index.js
router.get("/", logMiddleware, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
