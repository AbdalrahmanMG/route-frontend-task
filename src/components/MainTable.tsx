import { Label, Table, TextInput } from "flowbite-react";
import { ICustomer, IFilteredTransaction, ITransaction } from "../interfaces";
import { ChangeEvent, useEffect, useState } from "react";

interface IProps {
  transactions: ITransaction[];
  customers: ICustomer[];
  selectACustomer: (arg0: number | undefined) => void;
}

const MainTable = ({ transactions, customers, selectACustomer }: IProps) => {
  const [filteredCustomers, setFilteredCustomers] = useState<IFilteredTransaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [transactionsWithName, setTransactionsWithName] = useState<IFilteredTransaction[]>([]);

  useEffect(() => {
    const transactionsWithNames = transactions.map((t) => {
      const cust = customers.find((c) => +c.id == t.customer_id);
      return { ...t, name: cust?.name };
    });
    setFilteredCustomers(transactionsWithNames);
    setTransactionsWithName(transactionsWithNames);
  }, [customers, transactions]);

  //* Event handles
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleMinAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinAmount(parseFloat(event.target.value));
  };

  //* Filter
  const filterCustomers = () => {
    let filtered = transactionsWithName;

    if (searchTerm) {
      filtered = filtered.filter((customer) => customer.name?.toLowerCase().includes(searchTerm));
    }

    if (minAmount && !isNaN(minAmount)) {
      filtered = filtered.filter((customer) => customer.amount >= minAmount);
    }

    return filtered;
  };

  useEffect(() => {
    if (searchTerm || minAmount) {
      setFilteredCustomers(filterCustomers());
    }
  }, [searchTerm, minAmount, filteredCustomers]);

  return (
    <div className="basis-full lg:basis-6/12 overflow-x-auto">
      <div className="flex gap-3 items-center flex-wrap md:flex-nowrap justify-end  mb-3">
        <div className="flex gap-3 items-center">
          <Label htmlFor="name" value="Name" />
          <TextInput id="name" type="text" placeholder="Filter By Name" value={searchTerm} onChange={handleSearchChange} />
        </div>

        <div className="flex gap-3 items-center">
          <Label htmlFor="amount" value="Amount" />
          <TextInput id="amount" type="number" placeholder="Minimum Amount" value={minAmount} onChange={handleMinAmountChange} />
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto h-[60vh] md:h-[50vh] lg:h-[80vh] rounded-md border-slate-300 border-2 ">
        <Table hoverable>
          {/* header */}
          <Table.Head className="sticky top-0">
            <Table.HeadCell className="px-5">User Name</Table.HeadCell>
            <Table.HeadCell className="px-5 hidden sm:table-cell">Date</Table.HeadCell>
            <Table.HeadCell className="px-5 text-center sm:text-left">Amount</Table.HeadCell>
            <Table.HeadCell className="px-5 hidden sm:table-cell">Status</Table.HeadCell>
          </Table.Head>

          {/* body */}

          <Table.Body className="divide-y">
            {filteredCustomers.map((transaction) => {
              return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={() => selectACustomer(transaction.customer_id)}>
                  <Table.Cell className=" px-5 sm:table-cell ">
                    <span className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{transaction.name}</span>
                <br />
                    <span className="sm:hidden">{transaction.date}</span>
                  </Table.Cell>
                  <Table.Cell className="px-5 hidden sm:table-cell">{transaction.date}</Table.Cell>
                  <Table.Cell className="px-5 hidden sm:table-cell">{transaction.amount}</Table.Cell>
                  <Table.Cell className="p-0 flex sm:table-cell items-center justify-center flex-col">
                    <span className="sm:hidden">{transaction.amount}</span>
                    <span
                      className={`text-nowrap p-2 rounded-md
                      ${transaction.status === "Payment Successful" && "text-green-700 bg-green-200"}
                      ${transaction.status === "Payment Canceled" && "text-red-700 bg-red-200"}
                      ${transaction.status === "Payment Pending" && "text-gray-900 bg-gray-200"}`}
                    >
                      {transaction.status}
                    </span>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MainTable;
