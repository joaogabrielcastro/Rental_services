import React from "react";

export const EquipmentForm = ({
  equipmentForm,
  setEquipmentForm,
  onSubmit,
}) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-2">Criar Novo Equipamento</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nome"
        value={equipmentForm.name}
        onChange={(e) =>
          setEquipmentForm({ ...equipmentForm, name: e.target.value })
        }
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Imagem (URL)"
        value={equipmentForm.image}
        onChange={(e) =>
          setEquipmentForm({ ...equipmentForm, image: e.target.value })
        }
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Descrição"
        value={equipmentForm.description}
        onChange={(e) =>
          setEquipmentForm({ ...equipmentForm, description: e.target.value })
        }
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        min="1"
        placeholder="Estoque"
        value={equipmentForm.stock}
        onChange={(e) =>
          setEquipmentForm({ ...equipmentForm, stock: Number(e.target.value) })
        }
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Preço (ex: 100.00)"
        value={equipmentForm.price}
        onChange={(e) =>
          setEquipmentForm({
            ...equipmentForm,
            price: parseFloat(e.target.value),
          })
        }
        className="border p-2 w-full"
        required
      />

      <label className="block">
        <input
          type="checkbox"
          checked={equipmentForm.is_available}
          onChange={(e) =>
            setEquipmentForm({
              ...equipmentForm,
              is_available: e.target.checked,
            })
          }
          className="mr-2"
        />
        Disponível para aluguel
      </label>

<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
  Criar Equipamento
</button>

    </form>
  </section>
);
