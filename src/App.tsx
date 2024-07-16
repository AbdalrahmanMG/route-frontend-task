import "./App.css";
import MainTable from "./components/MainTable";
import { useEffect, useState } from "react";
import { ICustomer, ITransaction } from "./interfaces/index";
import { axiosInstance } from "./config";
import LineChartData from "./components/LineChartData";

function App() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [customerData, setCustomerData] = useState<ITransaction[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  // ** handlers
  const fetchTransactoins = async () => {
    const { data } = await axiosInstance.get("transactions");
    setTransactions(data);
  };
  const fetchCustomers = async () => {
    const { data } = await axiosInstance.get("customers");
    setCustomers(data);
  };
  const selectACustomer = (customerId: number | undefined) => {
    if (customerId) {
      const customerTransactions = transactions.filter(
        (transaction) => transaction.customer_id === +customerId
      );
      setCustomerData(customerTransactions);
    }
  };

  useEffect(() => {
    fetchTransactoins();
    fetchCustomers();
  }, []);

  return (
    <main className="flex items-center flex-wrap lg:flex-nowrap gap-4">
      {transactions.length != 0 ? (
        <>
          <MainTable
            transactions={transactions}
            customers={customers}
            selectACustomer={selectACustomer}
          />
          <LineChartData customerData={customerData} />
        </>
      ) : (
        <h2 className="text-2xl font-bold">There is no data yet</h2>
      )}
    </main>
  );
}

export default App;
