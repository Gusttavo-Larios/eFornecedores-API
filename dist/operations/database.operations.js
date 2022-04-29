"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSupplier = exports.updateSupplier = exports.selectSuplier = exports.selectAllSupliers = exports.insertSupplier = exports.createTable = void 0;
const database_config_1 = require("../config/database.config");
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, database_config_1.openDb)().then((database) => {
            database.exec("CREATE TABLE IF NOT EXISTS Supplier (id INTEGER PRIMARY KEY, company_name VARCHAR, fantasy_name VARCHAR, cnpj_number VARCHAR, city VARCHAR, state VARCHAR, district VARCHAR, cep_number VARCHAR, street VARCHAR)");
        });
    });
}
exports.createTable = createTable;
function insertSupplier(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cep_number, city, cnpj_number, company_name, district, fantasy_name, state, street, } = supplier;
        (0, database_config_1.openDb)().then((database) => {
            database.run("INSERT INTO Supplier (company_name, fantasy_name, cnpj_number, city, state, district, cep_number, street) VALUES (?,?,?,?,?,?,?,?)", [
                company_name,
                fantasy_name,
                cnpj_number,
                city,
                state,
                district,
                cep_number,
                street,
            ]);
        });
    });
}
exports.insertSupplier = insertSupplier;
function selectAllSupliers() {
    return __awaiter(this, void 0, void 0, function* () {
        const database = (0, database_config_1.openDb)();
        const response = (yield database).all("SELECT * FROM Supplier");
        return response;
    });
}
exports.selectAllSupliers = selectAllSupliers;
function selectSuplier(cnpj_number) {
    return __awaiter(this, void 0, void 0, function* () {
        const database = (0, database_config_1.openDb)();
        const response = (yield database).all("SELECT * FROM Supplier WHERE cnpj_number=?", [cnpj_number]);
        return response;
    });
}
exports.selectSuplier = selectSuplier;
function updateSupplier(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cep_number, city, cnpj_number, company_name, district, fantasy_name, state, street, id, } = supplier;
        (0, database_config_1.openDb)().then((database) => {
            return database.run("UPDATE Supplier SET company_name=?, fantasy_name=?, cnpj_number=?, city=?, state=?, district=?, cep_number=?, street=? WHERE id=?", [
                company_name,
                fantasy_name,
                cnpj_number,
                city,
                state,
                district,
                cep_number,
                street,
                id,
            ]);
        });
    });
}
exports.updateSupplier = updateSupplier;
function deleteSupplier(cnpj_number) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, database_config_1.openDb)().then((database) => {
            database.get("DELETE FROM Supplier WHERE cnpj_number=?", [cnpj_number]);
        });
    });
}
exports.deleteSupplier = deleteSupplier;
