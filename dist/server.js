"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_config_1 = require("./config/database.config");
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const database_operations_1 = require("./operations/database.operations");
dotenv_1.default.config();
(0, database_config_1.openDb)();
(0, database_operations_1.createTable)();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use("/", routes_1.default);
server.use((request, response) => response.status(404).json({ error: "Not Found" }));
server.listen(process.env.PORT || 3000);