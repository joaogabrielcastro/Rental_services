import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Allocation = () => {
  const { role } = useAuth();

  // Verifica se o usuário é admin
  if (role !== "user") {
      return <Navigate to="/login" replace />;
      
    }
      return (
      <div>
        {/* Allocation page content goes here */}
        Allocation Page
      </div>
    );
  };
  
  export  { Allocation };