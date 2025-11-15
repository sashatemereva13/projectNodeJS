import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.js";

// get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbPath;

if (path.isAbsolute(config.databaseUrl)) {
  dbPath = config.databaseUrl;
} else {
  dbPath = path.join(__dirname, "../../", config.databaseUrl);
}

console.log(`database path ${dbPath}`);

// create/connect to database file
const db = new Database(path.join(__dirname, "../../database.sqlite"));

// enable foreign keys for relational data
db.pragma("foreign_keys = ON");

// initialise datavase tables
export const initialiseDatabase = async () => {
  console.log("initialising database...");

  const User = (await import("../models/User.js")).default;
  const VideoGames = (await import("../models/VideoGames.js")).default;

  User.createTable();
  VideoGames.createTable();

  User.seed();
  VideoGames.seed();

  console.log(`Database initialisation complete`);
};

export default db;
