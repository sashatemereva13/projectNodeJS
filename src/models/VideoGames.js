import db from "../config/database.js";

export class VideoGame {
  static createTable() {
    const sql = `
              CREATE TABLE IF NOT EXISTS video_games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        genre TEXT,
        platform TEXT,
        releaseYear INTEGER,
        rating REAL,
        price REAL
      )
        `;
    db.prepare(sql).run();
  }

  static getAll() {
    return db.prepare("SELECT * FROM video_games").all();
  }

  static getById(id) {
    return db.prepare("SELECT * FROM video_games WHERE id = ?").get(id);
  }

  static create(data) {
    const { title, genre, platform, releaseYear, rating, price } = data;
    const stmt = db.prepare(
      `INSERT INTO video_games (title, genre, platform, releaseYear, rating, price)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    const result = stmt.run(title, genre, platform, releaseYear, rating, price);
    return this.getById(result.lastInsertRowid);
  }

  static update(id, data) {
    const { title, genre, platform, releaseYear, rating, price } = data;
    const stmt = db.prepare(
      `UPDATE video_games
       SET title = ?, genre = ?, platform = ?, releaseYear = ?, rating = ?, price = ?
       WHERE id = ?`
    );
    stmt.run(title, genre, platform, releaseYear, rating, price, id);
    return this.getById(id);
  }

  static delete(id) {
    db.prepare("DELETE FROM video_games WHERE id = ?").run(id);
  }
}

VideoGame.createTable();
