import { LineChart } from "@mui/x-charts/LineChart";
import { ITransaction } from "../interfaces";
interface IProps {
  customerData: ITransaction[];
}

const LineChartData = ({ customerData }: IProps) => {
  customerData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const dates = [];
  const amounts = [];

  for (const obj of customerData) {
    dates.push(new Date(obj.date));
    amounts.push(obj.amount);
  }
  const valueFormatter = (date: Date) =>
    date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <div className=" basis-full lg:basis-6/12 h-80 xl:max-h-[90vh] flex items-center justify-center bg-slate-100">
      {customerData.length != 0 ? (
        <LineChart
          xAxis={[
            {
              scaleType: "time",
              data: dates,
              tickMinStep: 3600 * 1000 * 12,
              valueFormatter,
            },
          ]}
          series={[
            {
              data: amounts,
            },
          ]}
        />
      ) : (
        <h2 className="font-semibold text-xl align-middle">
          Select a customer to show his transactions data
        </h2>
      )}
    </div>
  );
};

export default LineChartData;
