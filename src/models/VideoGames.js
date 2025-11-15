import db from "../config/database.js";

class VideoGames {
  static tableName = "video_games";

  static createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        genre TEXT,
        platform TEXT,
        releaseYear INTEGER,
        rating REAL,
        price REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;
    db.exec(sql);
    console.log(`Table '${this.tableName}' created/verified`);
  }

  static getAll() {
    return db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`).all();
  }

  static getById(id) {
    return db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id);
  }

  static create(data) {
    const { title, genre, platform, releaseYear, rating, price } = data;
    const stmt = db.prepare(`
      INSERT INTO ${this.tableName} 
      (title, genre, platform, releaseYear, rating, price)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      genre || null,
      platform || null,
      releaseYear || null,
      rating || null,
      price || null
    );

    return this.getById(result.lastInsertRowid);
  }

  static update(id, data) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    const stmt = db.prepare(`
      UPDATE ${this.tableName}
      SET ${fields.join(", ")}
      WHERE id = ?
    `);

    stmt.run(...values);
    return this.getById(id);
  }

  static delete(id) {
    const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`);
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static count() {
    return db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`).get()
      .count;
  }

  static seed() {
    if (this.count() === 0) {
      console.log("Seeding video games table...");

      const sampleGames = [
        {
          title: "The Legend of Zelda: Breath of the Wild",
          genre: "Adventure",
          platform: "Nintendo Switch",
          releaseYear: 2017,
          rating: 9.9,
          price: 59.99,
        },
        {
          title: "Elden Ring",
          genre: "RPG",
          platform: "PlayStation / PC",
          releaseYear: 2022,
          rating: 9.5,
          price: 69.99,
        },
        {
          title: "GTA V",
          genre: "Action",
          platform: "PC / PlayStation / Xbox",
          releaseYear: 2013,
          rating: 9.0,
          price: 29.99,
        },
      ];

      sampleGames.forEach((game) => this.create(game));
      console.log(`Seeded ${sampleGames.length} video games.`);
    }
  }
}

export default VideoGames;
