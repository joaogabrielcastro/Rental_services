import React from "react";
import { FaWrench, FaCalendarAlt, FaTools } from "react-icons/fa";

const mockHistory = [
  {
    id: "1",
    equipment: "Escavadeira CAT 320D",
    date: "2025-06-20",
    observation: "Troca de óleo e revisão hidráulica",
  },
  {
    id: "2",
    equipment: "Rolo Compactador Volvo SD110",
    date: "2025-06-15",
    observation: "Verificação dos pneus e alinhamento",
  },
  {
    id: "3",
    equipment: "Mini Escavadeira Bobcat E35",
    date: "2025-06-10",
    observation: "Manutenção no motor e limpeza do sistema",
  },
];

const History = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 text-white"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1581093458791-ff3af7c8fc6a?auto=format&fit=crop&w=1950&q=80")`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-black/60 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <FaWrench />
          Histórico de Manutenções
        </h1>
        <p className="mb-6 text-gray-300">
          Abaixo estão listados os equipamentos que passaram por manutenção após o uso. Acompanhe o status e mantenha sua operação sempre segura.
        </p>

        <div className="space-y-4">
          {mockHistory.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/90 text-black p-4 rounded-md shadow flex flex-col md:flex-row md:justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FaTools className="text-orange-500" />
                  {entry.equipment}
                </h2>
                <p className="text-sm text-gray-700 mt-1">
                  {entry.observation}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <FaCalendarAlt className="text-gray-600" />
                <span className="text-sm">{entry.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
