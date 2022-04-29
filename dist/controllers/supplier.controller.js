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
exports.exclude = exports.update = exports.resgiter = exports.search = exports.searchAll = void 0;
const database_operations_1 = require("../operations/database.operations");
function searchAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const allSuppliers = yield (0, database_operations_1.selectAllSupliers)();
        response.status(200).json({ allSuppliers });
    });
}
exports.searchAll = searchAll;
function search(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cnpj_number } = request.query;
        const supplier = yield (0, database_operations_1.selectSuplier)(cnpj_number);
        response.status(200).json({ supplier });
    });
}
exports.search = search;
function resgiter(request, response) {
    (0, database_operations_1.insertSupplier)(request.body);
    response.status(200).json({ message: "Fornecedor cadastrado com sucesso." });
}
exports.resgiter = resgiter;
function update(request, response) {
    const supplier = request.body;
    (0, database_operations_1.updateSupplier)(supplier);
    response.status(200).json({ message: "Fornecedor atualizado com sucesso" });
}
exports.update = update;
function exclude(request, response) {
    const { cnpj_number } = request.body;
    (0, database_operations_1.deleteSupplier)(cnpj_number);
    response.status(200).json({ message: "Fornecedor deletado com sucesso" });
}
exports.exclude = exclude;
