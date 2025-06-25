import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import API from "../API";

const Login = () => {
  const { login, role } = useAuth();
  const [aba, setAba] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [name, setNome] = useState("");
  console.log("Role do usuário:", role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await login({ email, password });

    if (!result) {
      alert("Login failed");
      return;
    }
  };

  const handleCadastro = async (e) => {
    console.log("Cadastrando usuário:", name, email, senha);
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      await API.post("/users/register", {
        name: name,
        email: email,
        password: password,
        role: "user",
      });
      setMensagem("Cadastro realizado com sucesso! Faça login.");
      setAba("login");
      setNome("");
      setEmail("");
      setSenha("");
    } catch {
      setMensagem("Erro ao cadastrar. Tente outro e-mail.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={aba === "login" ? handleSubmit : handleCadastro}
        className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-around mb-6">
          <button
            type="button"
            onClick={() => setAba("login")}
            className={`px-4 py-2 font-bold rounded ${
              aba === "login"
                ? "bg-orange-500 text-black"
                : "bg-gray-800 text-orange-400"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setAba("cadastro")}
            className={`px-4 py-2 font-bold rounded ${
              aba === "cadastro"
                ? "bg-orange-500 text-black"
                : "bg-gray-800 text-orange-400"
            }`}
          >
            Cadastrar
          </button>
        </div>
        {aba === "cadastro" ? (
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-orange-400">
              Nome
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-orange-400 bg-black text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={name}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
        ) : null}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-orange-400">
            E-mail
          </label>
          <input
            type="email"
            name="email"
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
            name="password"
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
          {aba === "login" ? "Entrar" : "Cadastrar"}
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
