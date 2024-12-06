import  { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export function Dashboard () {
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

  // Configurações do gráfico de barras (Patentes por Ano)
  const patentesAnoOptions = {
    chart: {
      id: "patentes-ano",
    },
    xaxis: {
      categories: patentesPorAno.map((item) => item.ano),
    },
  };

  const patentesAnoSeries = [
    {
      name: "Quantidade",
      data: patentesPorAno.map((item) => item.quantidade),
    },
  ];

  // Configurações do gráfico de torta (Top IPCs)
  const topIPCsOptions = {
    chart: {
      id: "top-ipcs",
    },
    labels: topIPCs.map((item) => item.ipc),
  };

  const topIPCsSeries = topIPCs.map((item) => item.quantidade);

  return (
    <div className="dashboard">
      <h1>Dashboard de Patentes</h1>
      <div className="info">
        <p>Total de Patentes: {totalPatentes}</p>
      </div>

      <div className="charts">
        <div className="chart">
          <h2>Patentes por Ano</h2>
          <Chart
            options={patentesAnoOptions}
            series={patentesAnoSeries}
            type="bar"
            height={350}
          />
        </div>

        <div className="chart">
          <h2>Top IPCs</h2>
          <Chart
            options={topIPCsOptions}
            series={topIPCsSeries}
            type="pie"
            height={350}
          />
        </div>
      </div>

      <div className="recent-patents">
        <h2>Patentes Recentes</h2>
        <ul>
          {patentesRecentes.map((patente, index) => (
            <li key={index}>
              <strong>{patente.titulo}</strong> (Pedido: {patente.pedido}) -{" "}
              {patente.deposito}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

