import VideoGames from "../models/VideoGames.js";

export const getAllVideoGames = (req, res) => {
  res.json(VideoGames.getAll());
};

export const getVideoGameById = (req, res) => {
  const game = VideoGames.getById(req.params.id);
  if (!game) {
    return res.status(404).json({ message: "Video game not found" });
  }
  res.json(game);
};

export const createVideoGame = (req, res) => {
  const newGame = VideoGames.create(req.body);
  res.status(201).json(newGame);
};

export const updateVideoGame = (req, res) => {
  const updatedGame = VideoGames.update(req.params.id, req.body);
  res.json(updatedGame);
};

export const deleteVideoGame = (req, res) => {
  VideoGame.delete(req.params.id);
  res.json({ message: "Video game deleted" });
};
