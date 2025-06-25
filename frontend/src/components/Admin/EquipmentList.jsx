import React from "react";
import API from "../../API";

const onDelete = async({id}) => {
    const response = await API.delete(`/equipments/delete/${id}`)
    
}

export const EquipmentList = ({ equipments, onRent, onDelete }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-2">Equipamentos</h2>
    {equipments.length === 0 ? (
      <p>Nenhum equipamento encontrado.</p>
    ) : (
      <ul className="list-disc ml-5">
        {equipments.map((eq) => (
          <li key={eq.id} className="mb-2 flex justify-between items-center">
            <span>
              {eq.name} (Estoque: {eq.stockAmount})
            </span>
            <div className="space-x-2">
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => {
                    onDelete(eq.id)
                    
                }}
                
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
);
