export interface ICustomer {
  id: string;
  name: string;
}

export interface ITransaction {
  id: string;
  customer_id: number;
  date: string;
  amount: number;
  status: string;
}
export interface IFilteredTransaction {
  id: string;
  customer_id: number;
  date: string;
  amount: number;
  status: string;
  name:string | undefined
}
