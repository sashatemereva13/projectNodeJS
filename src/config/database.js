// fast library for nodeJS
import Database from "better-sqlite3";

// to manipulate the system paths
import path from "path";

// to convert import.meta.url into a normal file path
import { fileURLToPath } from "url";

// configuration
import config from "./config.js";

// get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// determine the absolute path to the database
let dbPath;

if (path.isAbsolute(config.databaseUrl)) {
  dbPath = config.databaseUrl;
} else {
  dbPath = path.join(__dirname, "../../", config.databaseUrl);
}

console.log(`database path ${dbPath}`);

// create/connect to database file
const db = new Database(dbPath);

// enable foreign keys for relational data
db.pragma("foreign_keys = ON");

// initialise database tables
export const initialiseDatabase = async () => {
  console.log("initialising database...");

  // loads the model files dynamically
  const User = (await import("../models/User.js")).default;
  const VideoGames = (await import("../models/VideoGames.js")).default;

  // creates tables
  User.createTable();
  VideoGames.createTable();

  // fils the databases with initial data
  User.seed();
  VideoGames.seed();

  console.log(`Database initialisation complete`);
};

export default db;
