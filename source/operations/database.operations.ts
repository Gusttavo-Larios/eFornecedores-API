import { openDb } from "../database/database.config";
import SupplierInterface from "../interfaces/supplier.interface";

export async function createTable() {
  openDb().then((database) => {
    database.exec(
      "CREATE TABLE IF NOT EXISTS Supplier (id INTEGER PRIMARY KEY, company_name VARCHAR, fantasy_name VARCHAR, cnpj_number VARCHAR, city VARCHAR, state VARCHAR, district VARCHAR, cep_number VARCHAR, street VARCHAR)"
    );
  });
}

export async function insertSupplier(supplier: SupplierInterface) {
  const {
    cep_number,
    city,
    cnpj_number,
    company_name,
    district,
    fantasy_name,
    state,
    street,
  } = supplier;

  openDb().then((database) => {
    database.run(
      "INSERT INTO Supplier (company_name, fantasy_name, cnpj_number, city, state, district, cep_number, street) VALUES (?,?,?,?,?,?,?,?)",
      [
        company_name,
        fantasy_name,
        cnpj_number,
        city,
        state,
        district,
        cep_number,
        street,
      ]
    );
  });
}

export async function selectAllSupliers() {
  const database = openDb();
  const response = (await database).all("SELECT * FROM Supplier");
  return response;
}

export async function selectSuplier(cnpj_number: string) {
  const database = openDb();
  const response = (await database).all(
    "SELECT * FROM Supplier WHERE cnpj_number=?",
    [cnpj_number]
  );
  return response;
}

export async function updateSupplier(supplier: SupplierInterface) {
  const {
    cep_number,
    city,
    cnpj_number,
    company_name,
    district,
    fantasy_name,
    state,
    street,
    id,
  } = supplier;
  openDb().then((database) => {
    return database.run(
      "UPDATE Supplier SET company_name=?, fantasy_name=?, cnpj_number=?, city=?, state=?, district=?, cep_number=?, street=? WHERE id=?",
      [
        company_name,
        fantasy_name,
        cnpj_number,
        city,
        state,
        district,
        cep_number,
        street,
        id,
      ]
    );
  });
}

export async function deleteSupplier(cnpj_number: string) {
  openDb().then((database) => {
    database.get("DELETE FROM Supplier WHERE cnpj_number=?", [cnpj_number]);
  });
}
