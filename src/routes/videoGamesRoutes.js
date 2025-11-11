import express from "express";
import {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
} from "../controllers/videoGameController.js";

const router = express.Router();

router.get("/", getAllVideoGames);
router.get("/:id", getVideoGameById);
router.post("/", createVideoGame);
router.put("/:id", updateVideoGame);
router.delete("/:id", deleteVideoGame);

export default router;
