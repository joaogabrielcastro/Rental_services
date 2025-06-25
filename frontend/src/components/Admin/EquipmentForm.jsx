import React from "react";

export const EquipmentForm = ({ equipmentForm, setEquipmentForm, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Novo Equipamento</h2>

      <div className="mb-3">
        <label className="block font-medium">Nome</label>
        <input
          type="text"
          name="name"
          value={equipmentForm.name}
          onChange={(e) =>
            setEquipmentForm({ ...equipmentForm, name: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Imagem (URL pública)</label>
        <input
          type="text"
          name="image"
          placeholder="https://exemplo.com/imagem.jpg"
          value={equipmentForm.image}
          onChange={(e) =>
            setEquipmentForm({ ...equipmentForm, image: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Preço (Diária)</label>
        <input
          type="number"
          name="price"
          value={equipmentForm.price}
          onChange={(e) =>
            setEquipmentForm({ ...equipmentForm, price: Number(e.target.value) })
          }
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Estoque</label>
        <input
          type="number"
          name="stock"
          value={equipmentForm.stock}
          onChange={(e) =>
            setEquipmentForm({ ...equipmentForm, stock: Number(e.target.value) })
          }
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={equipmentForm.is_available}
          onChange={(e) =>
            setEquipmentForm({ ...equipmentForm, is_available: e.target.checked })
          }
        />
        <label>Disponível</label>
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Cadastrar Equipamento
      </button>
    </form>
  );
};
