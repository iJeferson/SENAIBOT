import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import ReactEcharts from "echarts-for-react";

export function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dashboard");
        setData(response.data.resumo);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="loading-screen flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700">Carregando dados, por favor aguarde...</p>
        </div>
      </div>
    );
  }

  const { totalPatentes, topIPCs, patentesRecentes, patentesPorAno, input, periodo } = data;

  // Gráfico de Linha: Patentes por Ano (ApexCharts)
  const patentesAnoOptions = {
    chart: {
      type: "line",
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
        text: "Quantidade de Patentes",
      },
    },
    title: {
      text: "Patentes por Ano",
      align: "center",
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} patentes`,
      },
    },
    colors: ["#1E90FF"],
  };

  const patentesAnoSeries = [
    {
      name: "Quantidade",
      data: patentesPorAno.map((item) => item.quantidade),
    },
  ];

  // Gráfico de Barras: Top IPCs (Apache ECharts)
  const topIPCsOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    title: {
      text: "Top IPCs",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: topIPCs.map((item) => item.ipc),
      axisLabel: {
        rotate: -45,
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      name: "Quantidade",
      axisLabel: {
        fontSize: 12,
      },
    },
    series: [
      {
        name: "Quantidade",
        type: "bar",
        data: topIPCs.map((item) => item.quantidade),
        itemStyle: {
          color: "#FFA500",
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10,
      },
      {
        type: "slider",
        show: false,
        start: 0,
        end: 10,
      },
    ],
    grid: {
      containLabel: true,
      height: "300px",
    },
  };

  return (
    <main className="min-h-screen">
      <div className="dashboard container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Dashboard de Patentes
        </h1>

        {/* Cards */}
        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {/* Card: Termo Pesquisado */}
          <div className="card p-6 bg-gray-50 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Termo Pesquisado</h3>
            <p className="text-xl font-bold text-blue-600 mt-2">{input}</p>
          </div>

          {/* Card: Total de Patentes */}
          <div className="card p-6 bg-gray-50 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total de Patentes</h3>
            <p className="text-xl font-bold text-blue-600 mt-2">{totalPatentes}</p>
          </div>

          {/* Card: Período Encontrado */}
          <div className="card p-6 bg-gray-50 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Período Encontrado</h3>
            <p className="text-xl font-bold text-blue-600 mt-2">{periodo}</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="charts space-y-6">
          {/* Gráfico de Patentes por Ano (ApexCharts) */}
          <div className="chart p-4 bg-gray-50 rounded-lg shadow-md">
            <Chart
              options={patentesAnoOptions}
              series={patentesAnoSeries}
              type="line"
              height={350}
            />
          </div>

          {/* Gráfico de Barras - Top IPCs (Apache ECharts) */}
          <div className="chart p-4 bg-gray-50 rounded-lg shadow-md">
            <ReactEcharts option={topIPCsOptions} style={{ height: 400 }} />
          </div>
        </div>

        {/* Patentes Recentes */}
        <div className="recent-patents mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Patentes Recentes
          </h2>
          <ul className="space-y-2">
            {patentesRecentes.map((patente:any, index:any) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <strong className="text-lg text-gray-700">
                  {patente.titulo}
                </strong>{" "}
                <br />
                <span className="text-sm text-gray-500">
                  Pedido: {patente.pedido}
                </span>{" "}-{" "}
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
