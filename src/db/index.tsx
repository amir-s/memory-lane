"use server";
import sqlite3, { RunResult } from "sqlite3";
const db = new sqlite3.Database("memories.db");

export interface Memory {
  id: number;
  secret: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface Entry {
  id: number;
  memory_id: number;
  title: string;
  description: string;
  image: string;
  timestamp: string;
}

export const createMemory = ({
  title,
  description,
  timestamp,
  secret,
}: {
  title: string;
  description: string;
  timestamp: string;
  secret: string;
}): Promise<number> => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "INSERT INTO memories (secret, title, description, timestamp) VALUES (?, ?, ?, ?)"
    );
    stmt.run(
      secret,
      title,
      description,
      timestamp,
      function (this: RunResult, err: Error) {
        if (err) reject(err);
        resolve(this.lastID);
      }
    );
  });
};

export const getMemory = (id: number): Promise<Memory | undefined> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM memories WHERE id = ?",
      [id],
      (err, row: Memory | undefined) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  });
};

export const createEntry = (
  memory_id: number,
  entry: Omit<Entry, "id">
): Promise<number> => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "INSERT INTO entries (memory_id, title, description, image, timestamp) VALUES (?, ?, ?, ?, ?)"
    );
    stmt.run(
      memory_id,
      entry.title,
      entry.description,
      entry.image,
      entry.timestamp,
      function (this: RunResult, err: Error) {
        if (err) reject(err);
        resolve(this.lastID);
      }
    );
  });
};

export const getMemoryEntries = (id: number): Promise<Entry[]> => {
  return new Promise((resolve, reject) => {
    db.all<Entry>(
      "SELECT * FROM entries WHERE memory_id = ? ORDER BY timestamp DESC",
      [id],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};
