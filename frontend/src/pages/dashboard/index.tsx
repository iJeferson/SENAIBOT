import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dashboard"); // URL do backend
        setData(response.data.resumo);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Carregando...</p>;

  const { totalPatentes, topIPCs, patentesRecentes, patentesPorAno } = data;

  // Configurações do gráfico de linha (Patentes por Ano)
  const patentesAnoOptions = {
    chart: {
      id: "patentes-ano",
      toolbar: { show: false },
    },
    xaxis: {
      categories: patentesPorAno.map((item) => item.ano),
      title: {
        text: "Ano",
      },
    },
    yaxis: {
      title: {
        text: "Quantidade",
      },
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e0e0e0",
    },
    title: {
      text: "Patentes por Ano",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
      },
    },
  };

  const patentesAnoSeries = [
    {
      name: "Quantidade",
      data: patentesPorAno.map((item) => item.quantidade),
    },
  ];

  // Configurações do gráfico de barras (Top IPCs)
  const topIPCsOptions = {
    chart: {
      id: "top-ipcs",
      toolbar: { show: false },
    },
    xaxis: {
      categories: topIPCs.map((item) => item.ipc),
      title: {
        text: "IPC",
      },
    },
    yaxis: {
      title: {
        text: "Quantidade",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Gráfico de barras verticais
      },
    },
    title: {
      text: "Top IPCs",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
      },
    },
  };

  const topIPCsSeries = [
    {
      name: "Quantidade",
      data: topIPCs.map((item) => item.quantidade),
    },
  ];

  return (
    <main className="min-h-screen ">
      <div className="dashboard container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Dashboard de Patentes
        </h1>
        <div className="info text-center text-lg mb-6">
          <p>
            Total de Patentes:{" "}
            <span className="font-semibold text-blue-600">{totalPatentes}</span>
          </p>
        </div>

        <div className="charts space-y-6">
          {/* Gráfico de Patentes por Ano (linha) */}
          <div className="chart p-4 bg-gray-50 rounded-lg shadow-md">
            <Chart
              options={patentesAnoOptions}
              series={patentesAnoSeries}
              type="line"
              height={350}
            />
          </div>

          {/* Gráfico de barras - Top IPCs */}
          <div className="chart p-4 bg-gray-50 rounded-lg shadow-md">
            <Chart
              options={topIPCsOptions}
              series={topIPCsSeries}
              type="bar" // Gráfico de barras (coluna)
              height={350}
            />
          </div>
        </div>

        <div className="recent-patents mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Patentes Recentes
          </h2>
          <ul className="space-y-2">
            {patentesRecentes.map((patente, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <strong className="text-lg text-gray-700">
                  {patente.titulo}
                </strong>{" "}
                <br />
                <span className="text-sm text-gray-500">
                  Pedido: {patente.pedido}
                </span>{" "}
                -{" "}
                <span className="text-sm text-gray-500">
                  Depósito: {patente.deposito}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
