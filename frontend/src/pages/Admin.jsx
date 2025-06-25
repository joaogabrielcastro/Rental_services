import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { EquipmentList } from "../components/Admin/EquipmentList";
import { EquipmentForm } from "../components/Admin/EquipmentForm";


const Admin = () => {
  const { role, isAuthenticated, loading, token: authToken } = useAuth();

  const [equipments, setEquipments] = useState([]);
  const [equipmentForm, setEquipmentForm] = useState({
    name: "",
    image: "",
    description: "",
    stock: 1,
    price: 0,
    is_available: true,
  });

  const authHeaders = React.useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    [authToken]
  );

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3333/equipments/all",
          authHeaders
        );
        setEquipments(res.data);
      } catch (err) {
        console.error("Erro ao buscar equipamentos:", err);
      }
    };

    const fetchRentals = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3333/rentals/all",
          authHeaders
        );
        (res.data);
      } catch (err) {
        console.error("Erro ao buscar aluguéis:", err);
      }
    };

    fetchEquipments();
    fetchRentals();
  }, [authToken, authHeaders]);

  if (loading) return <p>Carregando...</p>;
  if (!isAuthenticated || role !== "admin")
    return <Navigate to="/login" replace />;

  async function fetchEquipments() {
    try {
      const res = await axios.get(
        "http://localhost:3333/equipments/all",
        authHeaders
      );
      setEquipments(res.data);
    } catch (err) {
      console.error("Erro ao buscar equipamentos:", err);
    }
  }

  const fetchRentals = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3333/rentals/all",
        authHeaders
      );
      (res.data);
    } catch (err) {
      console.error("Erro ao buscar aluguéis:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3333/equipments/create",
        equipmentForm,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      alert("Equipamento criado com sucesso!");
      setEquipmentForm({
        name: "",
        image: "",
        description: "",
        stock: 1,
        price: 0,
        is_available: true,
      });
      fetchEquipments();
    } catch (err) {
      console.error("Erro ao criar equipamento:", err);
      alert("Erro ao criar equipamento.");
    }
  };

  const handleDeleteEquipment = async (id) => {
    if (!window.confirm("Confirma a exclusão do equipamento?")) return;
    try {
      await axios.delete(`http://localhost:3333/equipments/delete/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      fetchEquipments();
    } catch (err) {
      console.error("Erro ao deletar equipamento:", err);
    }
  };

  const handleRentEquipment = async (equipmentId) => {
    try {
      await axios.post(
        "http://localhost:3333/rentals/rent",
        { equipmentId },
        authHeaders
      );
      fetchRentals();
    } catch (err) {
      console.error("Erro ao alugar equipamento:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel do Administrador</h1>

      <EquipmentList
        equipments={equipments}
        onRent={handleRentEquipment}
        onDelete={handleDeleteEquipment}
      />

      <EquipmentForm
        equipmentForm={equipmentForm}
        setEquipmentForm={setEquipmentForm}
        onSubmit={handleSubmit}
      />  

    </div>
  );
};

export { Admin };
