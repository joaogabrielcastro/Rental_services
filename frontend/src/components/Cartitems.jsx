import React, { useState } from "react";
import { toast } from "react-toastify";

const CartItems = ({ itensCarrinho, atualizarQuantidade, removerDoCarrinho }) => {
  const [datas, setDatas] = useState({}); // Armazena datas por item

  const handleChangeQuantidade = (id, novaQuantidade) => {
    atualizarQuantidade(id, novaQuantidade < 1 ? 1 : novaQuantidade);
  };

  const handleChangeData = (id, campo, valor) => {
    setDatas((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [campo]: valor,
      },
    }));
  };

  const handleExcluir = (id) => {
    removerDoCarrinho(id);
  };

  const handleAlocar = async (id) => {
    const item = itensCarrinho.find((item) => item.id === id);
    const dataItem = datas[id];


    if (!dataItem?.inicio || !dataItem?.fim) {
      toast.error("Preencha a data inicial e final!");
      return;

      
    }

    const payload = {
      produtoId: item.id,
      nome: item.nome,
      quantidade: item.quantidade,
      dataInicio: dataItem.inicio,
      dataFim: dataItem.fim,
      userId: "user_123", // <- Substitua pelo id real do usuário logado
    };

    try {
      await fetch("/api/alocar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.success(`Item ${item.nome} alocado com sucesso!`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao alocar item.");
    }
  };

  const calcularTotalGeral = () =>
    itensCarrinho.reduce(
      (total, item) => total + item.price * item.quantidade,
      0
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-orange-500 mb-2">
        Alocação de Itens
      </h1>
      <p className="mb-6 text-gray-700">Itens alocados no carrinho:</p>

      <section className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-3 text-left">Produto</th>
              <th className="p-3 text-left">Preço</th>
              <th className="p-3 text-left">Diária</th>
              <th className="p-3 text-left">Data Inicial</th>
              <th className="p-3 text-left">Data Final</th>
              <th className="p-3 text-left">Ação</th>
            </tr>
          </thead>
          <tbody>
            {itensCarrinho.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-100">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={`Imagem de ${item.nome}`}
                    className="w-[100px] h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-black">{item.nome}</h2>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </td>
                <td className="p-3 text-black">R${item.price},00</td>
                <td className="p-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantidade}
                    onChange={(e) =>
                      handleChangeQuantidade(item.id, parseInt(e.target.value))
                    }
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-black"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="date"
                    value={datas[item.id]?.inicio || ""}
                    onChange={(e) =>
                      handleChangeData(item.id, "inicio", e.target.value)
                    }
                    className="border border-gray-300 rounded px-2 py-1 text-black"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="date"
                    value={datas[item.id]?.fim || ""}
                    onChange={(e) =>
                      handleChangeData(item.id, "fim", e.target.value)
                    }
                    className="border border-gray-300 rounded px-2 py-1 text-black"
                  />
                </td>
                <td className="p-3">
                  <span className="mr-4">
                    <button
                      className="text-orange-500 hover:underline"
                      onClick={() => handleExcluir(item.id)}
                    >
                      Excluir
                    </button>
                  </span>
                  <span>
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => handleAlocar(item.id)}
                    >
                      Alocar
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-6 text-right text-xl font-bold text-black">
        Total Geral: R${calcularTotalGeral()},00
      </div>
    </div>
  );
};

export default CartItems;
