import { Request, Response } from "express";
import SupplierInterface from "../interfaces/supplier.interface";
import {
  insertSupplier,
  selectAllSupliers,
  selectSuplier,
  updateSupplier,
  deleteSupplier,
} from "../operations/database.operations";

export async function searchAll(request: Request, response: Response) {
  const allSuppliers = await selectAllSupliers();
  response.status(200).json({ allSuppliers });
}

export async function search(request: Request, response: Response) {
  const { cnpj_number } = request.query as unknown as SupplierInterface;
  const supplier = await selectSuplier(cnpj_number);
  response.status(200).json({ supplier });
}

export function resgiter(request: Request, response: Response) {
  insertSupplier(request.body);
  response.status(200).json({ message: "Fornecedor cadastrado com sucesso." });
}

export function update(request: Request, response: Response) {
  const supplier: SupplierInterface = request.body;
  updateSupplier(supplier);
  response.status(200).json({ message: "Fornecedor atualizado com sucesso" });
}

export function exclude(request: Request, response: Response) {
  const { cnpj_number } = request.body;
  deleteSupplier(cnpj_number);
  response.status(200).json({ message: "Fornecedor deletado com sucesso" });
}
