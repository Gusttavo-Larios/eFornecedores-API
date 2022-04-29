import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export async function openDb() {
  return open({
    filename: path.join(__dirname, "suppliers.database.db"),
    driver: sqlite3.Database,
  });
}
