/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "../../components/container";
import BasicTable from "../../components/table";
import ClipLoader from "react-spinners/ClipLoader";
import { MdDashboard } from "react-icons/md";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

export function Home() {
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

      console.log("Resposta do servidor:", response.data);

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
        console.warn("Nenhum dado encontrado na chave 'resultado'.");
      }
    } catch (error) {
      setError("Erro ao buscar dados. Tente novamente.");
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleExcel(pesquisaRealizada: string) {
    try {
      const response = await axios.get("http://localhost:3000/download", {
        responseType: "blob",
        params: { pesquisa_realizada: pesquisaRealizada },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${pesquisaRealizada}_dados_patentes.xlsx`);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar o arquivo Excel:", error);
    }
  }

  return (
    <main className="h-screen">
      <Container>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center uppercase">
            Pesquise por uma patente
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center mt-4 gap-4">
              <input
                type="text"
                placeholder="Inserir o nome da patente"
                className="border-2 border-gray-300 rounded-md p-2 w-1/2 h-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-blue-600 border-none h-12 text-white rounded-lg px-6 hover:bg-blue-500 transition-all duration-300">
                Buscar
              </button>
            </div>
          </form>
        </div>

        <div className="my-8">
          {hasSearched && (
            <>
              {loading ? (
                <p className="text-center text-blue-600">
                  <ClipLoader size={50} />
                </p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : data.length === 0 && !loading ? (
                <p className="text-center text-gray-600">
                  Nenhuma patente encontrada.
                </p>
              ) : (
                <>
                  <div className="overflow-x-auto p-4  rounded-lg">
                    <BasicTable rows={data} />
                    <div className="flex items-center mt-4 gap-4">
                      <button
                        title="Gerar planilha no Excel"
                        className="bg-green-600 flex items-center gap-2 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mt-4"
                        onClick={() => handleExcel(data[0].pesquisa)}
                      >
                        <PiMicrosoftExcelLogoFill size={20} />
                        Gerar Excel
                      </button>
                      <Link
                        className="bg-blue-600 flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mt-4"
                        to="/dashboard"
                      >
                        <MdDashboard size={20} />
                        Dashboard
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
