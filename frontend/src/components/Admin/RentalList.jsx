import React from "react";

export const RentalList = ({ rentals, onCancel }) => (
  <section>
    <h2 className="text-xl font-semibold mb-2">Todos os Aluguéis</h2>
    {rentals.length === 0 ? (
      <p>Nenhum aluguel encontrado.</p>
    ) : (
      <ul className="list-disc ml-5">
        {rentals.map((rental) => (
          <li key={rental.id} className="mb-2 flex justify-between items-center">
            <span>
              Usuário: {rental.userId} | Equipamento: {rental.equipmentId} | De: {rental.rentDate} até {rental.returnDate}
            </span>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => onCancel(rental.id)}
            >
              Cancelar
            </button>
          </li>
        ))}
      </ul>
    )}
  </section>
);
