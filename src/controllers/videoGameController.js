import { VideoGame } from "../models/VideoGames.js";

export const getAllVideoGames = (req, res) => {
  res.json(VideoGame.getAll());
};

export const getVideoGameById = (req, res) => {
  const game = VideoGame.getById(req.params.id);
  if (!game) {
    return res.status(404).json({ message: "Video game not found" });
  }
  res.json(game);
};

export const createVideoGame = (req, res) => {
  const newGame = VideoGame.create(req.body);
  res.status(201).json(newGame);
};

export const updateVideoGame = (req, res) => {
  const updatedGame = VideoGame.update(req.params.id, req.body);
  res.json(updatedGame);
};

export const deleteVideoGame = (req, res) => {
  VideoGame.delete(req.params.id);
  res.json({ message: "Video game deleted" });
};
