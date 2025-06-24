import React, { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";
import API from "../API";

const ProdutoCard = ({ produto, adicionarAoCarrinho }) => (
  <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
    <img
      src={produto.imagem}
      alt={produto.nome}
      className="w-full h-48 object-cover"
    />
    <div className="p-4 bg-gray-00">
      <h2 className="text-lg font-bold text-black">{produto.name}</h2>
      <p className="text-sm text-gray-600">{produto.descricao}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-orange-500">
          Diária: R$ {produto.diaria},00
        </span>
        <button onClick={() => adicionarAoCarrinho(produto)}>
          <CiShoppingCart className="text-black" size={22} />
        </button>
      </div>
    </div>
  </div>
);

const Main = ({ adicionarAoCarrinho }) => {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const categorias = ["Caminhão", "Escavadeira", "Trator"];

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await API.get("/equipments/available");
        setProdutos(response.data);
        setFilteredProdutos(response.data);
        console.log("Produtos carregados:", response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const filtrarProdutos = (categoria, busca) => {
    let resultados = [...produtos];

    if (categoria) {
      resultados = resultados.filter((produto) =>
        produto.nome.toLowerCase().includes(categoria.toLowerCase())
      );
    }

    if (busca) {
      resultados = resultados.filter((produto) =>
        produto.nome.toLowerCase().includes(busca.toLowerCase())
      );
    }

    setFilteredProdutos(resultados);
  };

  const handleSearch = (e) => {
    const valor = e.target.value;
    setSearchTerm(valor);
    filtrarProdutos(categoriaSelecionada, valor);
  };

  const handleCategoriaClick = (categoria) => {
    const novaCategoria = categoriaSelecionada === categoria ? null : categoria;
    setCategoriaSelecionada(novaCategoria);
    filtrarProdutos(novaCategoria, searchTerm);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <header className="sticky top-0 bg-white shadow z-10 p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-orange-500">
            Aluguel de Equipamentos
          </h1>
          <div className="flex items-center bg-gray-100 rounded px-3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar por nome"
              className="bg-transparent p-2 outline-none w-52 text-black"
            />
            <button>
              <HiMagnifyingGlass size={20} className="text-orange-500" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          {categorias.map((categoria, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoriaClick(categoria)}
              className={`cursor-pointer px-5 py-2 rounded-full shadow font-medium text-white ${
                categoriaSelecionada === categoria
                  ? "bg-orange-500"
                  : "bg-black hover:bg-orange-500 transition-colors"
              }`}
            >
              {categoria}
            </div>
          ))}
        </div>
      </header>

      <main className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 p-6">
        {filteredProdutos.length > 0 ? (
          filteredProdutos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              adicionarAoCarrinho={adicionarAoCarrinho}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            Nenhum produto encontrado.
          </p>
        )}
      </main>
    </div>
  );
};

export default Main;
