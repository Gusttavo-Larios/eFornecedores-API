import internal from "stream";

export default interface SupplierInterface {
  id: number;
  company_name: string;
  fantasy_name: string;
  cnpj_number: string;
  city: string;
  state: string;
  district: string;
  cep_number: string;
  street: string;
}
