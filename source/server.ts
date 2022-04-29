import express, { Request, Response } from "express";
import cors from "cors";
import { openDb } from "./config/database.config";
import dotenv from "dotenv";

import mainRoutes from "./routes";
import { createTable } from "./operations/database.operations";

dotenv.config();
openDb();
createTable();

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/", mainRoutes);

server.use((request: Request, response: Response) =>
  response.status(404).json({ error: "Not Found" })
);

let port: number | string | undefined = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

server.listen(port);
