import { useState } from "react";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { History } from "./pages/History.jsx";  
import Sidebar from "./components/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";

function App() {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    const existe = carrinho.find((item) => item.id === produto.id);
    if (existe) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const atualizarQuantidade = (id, quantidade) => {
    setCarrinho(
      carrinho.map((item) =>
        item.id === id
          ? { ...item, quantidade: quantidade < 1 ? 1 : quantidade }
          : item
      )
    );
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          index
          element={<Home adicionarAoCarrinho={adicionarAoCarrinho} />}
        />
        <Route
          path="cart"
          element={
            <Cart
              itensCarrinho={carrinho}
              atualizarQuantidade={atualizarQuantidade}
              removerDoCarrinho={removerDoCarrinho}
            />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<PrivateAdminRoute />} />
        <Route path="history" element={<History />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  );
}

function Root() {
  const { role } = useAuth();
  return (
    <div className="flex">
      <Sidebar usuarioLogado={role} />
      <div className="ml-[80px] w-full">
        <Outlet />
      </div>
    </div>
  );
}

function PrivateAdminRoute() {
  const { role } = useAuth();
  if (role === "admin") {
    return <Admin />;
  }
  return <Navigate to="/login" replace />;
}

export default App;
