const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("memories.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      secret TEXT,
      title TEXT,
      description TEXT,
      timestamp DATE
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_id INTEGER,
      title TEXT,
      description TEXT,
      image TEXT,
      timestamp DATE,
      FOREIGN KEY(memory_id) REFERENCES memories(id) ON DELETE CASCADE
    )`);
});
