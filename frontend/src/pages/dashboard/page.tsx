/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent } from "react";
import axios from "axios";
import { Container } from "../../components/container";
import BasicTable from "../../components/table";
import ClipLoader from "react-spinners/ClipLoader";
import Chart from "react-apexcharts";

export function Dashboard() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await axios.post("http://localhost:3000/pesquisar", {
        input: search,
      });

      if (response.data.resultado && Array.isArray(response.data.resultado)) {
        const formattedData = response.data.resultado.map((item: any) => ({
          pedido: item.pedido,
          deposito: item.deposito,
          titulo: item.titulo,
          link: item.link,
          ipc: item.ipc,
          pesquisa: item.pesquisa_realizada,
          descricaoWipo:
            item.descricaoWipo?.descricao || "Descrição não disponível",
        }));
        setData(formattedData);
      } else {
        setData([]);
      }
    } catch (error) {
      setError("Erro ao buscar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // Dados para os gráficos
  const summaryData = [
    { title: "Sales", value: "$424,652" },
    { title: "Expenses", value: "$235,312" },
    { title: "Profits", value: "$135,965" },
  ];

  const barChartData = {
    series: [
      { name: "Clothing", data: [40, 60, 80, 20, 50, 60, 80, 90] },
      { name: "Food Products", data: [30, 70, 50, 90, 40, 50, 70, 60] },
    ],
    options: {
      chart: { type: "bar", height: 350 },
      title: { text: "Monthly Sales" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] },
    },
  };

  const pieChartData = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: { type: "donut" },
      labels: ["Clothing", "Food Products", "Electronics", "Kitchen Utility", "Gardening"],
      title: { text: "Department Sales" },
    },
  };

  const areaChartData = {
    series: [
      { name: "Day Time", data: [3, 5, 8, 6, 9, 7, 10, 4] },
      { name: "Night Time", data: [2, 6, 7, 4, 8, 5, 9, 3] },
    ],
    options: {
      chart: { type: "area", height: 350 },
      title: { text: "Daily Visits Insights" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] },
    },
  };

  return (
    <Container>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center uppercase mb-6">
          Dashboard
        </h1>

        {/* Resumo */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {summaryData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 text-center"
            >
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-md p-4">
            <Chart
              options={barChartData.options}
              series={barChartData.series}
              type="bar"
              height={350}
            />
          </div>

          <div className="bg-white shadow-md rounded-md p-4">
            <Chart
              options={pieChartData.options}
              series={pieChartData.series}
              type="donut"
              height={350}
            />
          </div>

          <div className="bg-white shadow-md rounded-md p-4">
            <Chart
              options={areaChartData.options}
              series={areaChartData.series}
              type="area"
              height={350}
            />
          </div>

          <div className="bg-white shadow-md rounded-md p-4 text-center">
            <h2 className="text-xl font-bold">Customers</h2>
            <p className="text-2xl font-semibold">168,215</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
