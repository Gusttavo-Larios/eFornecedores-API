import { Request, Response } from "express";
import SupplierInterface from "../interfaces/supplier.interface";
import {
  insertSupplier,
  selectAllSupliers,
  selectSuplier,
  updateSupplier,
  deleteSupplier,
  selectAllSuppliersByCnpj,
} from "../operations/database.operations";

export async function searchAll(_request: Request, response: Response) {
  const allSuppliers = await selectAllSupliers();
  return response.status(200).json({ allSuppliers });
}

export async function search(request: Request, response: Response) {
  const { cnpj_number } = request.query as unknown as SupplierInterface;
  const supplier = await selectSuplier(cnpj_number);
  return response.status(200).json({ supplier });
}

export async function resgiter(request: Request, response: Response) {
  const supplier: SupplierInterface = request.body;

  const registered_supplier = await selectSuplier(supplier.cnpj_number);
  const cnpj_already_registered = registered_supplier ? true : false;

  if (cnpj_already_registered) {
    return response
      .status(400)
      .json({ message: "CNPJ já existente no sistema" });
  }

  insertSupplier(supplier);
  return response
    .status(200)
    .json({ message: "Fornecedor cadastrado com sucesso." });
}

export async function update(request: Request, response: Response) {
  const supplier: SupplierInterface = request.body;

  const registered_suppliers = await selectAllSuppliersByCnpj(
    supplier.cnpj_number
  );

  const cnpj_already_registered = registered_suppliers.every(
    (element, _index, _array) => {
      return (
        element.id === supplier.id &&
        element.cnpj_number == supplier.cnpj_number
      );
    }
  );

  if (!cnpj_already_registered) {
    return response
      .status(400)
      .json({ message: "CNPJ já existente no sistema" });
  }

  updateSupplier(supplier);
  return response
    .status(200)
    .json({ message: "Fornecedor atualizado com sucesso" });
}

export function exclude(request: Request, response: Response) {
  const { cnpj_number } = request.body;
  deleteSupplier(cnpj_number);
  return response
    .status(200)
    .json({ message: "Fornecedor deletado com sucesso" });
}
