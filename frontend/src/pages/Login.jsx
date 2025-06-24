import React, { useState } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, senha);
      setMensagem("Login realizado com sucesso!");
    } catch {
      setMensagem("Credenciais inválidas.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Login
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-orange-400">
            E-mail
          </label>
          <input
            type="email"
            className="w-full border border-orange-400 bg-black text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-orange-400">
            Senha
          </label>
          <input
            type="password"
            className="w-full border border-orange-400 bg-black text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-black font-bold py-2 rounded hover:bg-orange-600 transition"
        >
          Entrar
        </button>

        {mensagem && (
          <p
            className={`mt-4 text-center ${
              mensagem.includes("sucesso") ? "text-green-500" : "text-red-500"
            }`}
          >
            {mensagem}
          </p>
        )}
      </form>
    </div>
  );
};

export { Login };
