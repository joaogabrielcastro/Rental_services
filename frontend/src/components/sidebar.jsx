import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CiShoppingCart, CiHome } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const Sidebar = ({ usuarioLogado }) => {
  const menuItems = [
    { to: "/login", icon: <IoPersonOutline size={24} />, label: "Login" },
    { to: "/", icon: <CiHome size={24} />, label: "Home" },
    { to: "/cart", icon: <CiShoppingCart size={24} />, label: "Carrinho" },
    ...(usuarioLogado?.tipo === "admin"
      ? [{ to: "/admin", icon: <GrUserAdmin size={24} />, label: "Admin" }]
      : []),
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-20 bg-black text-white p-4 flex flex-col items-center shadow-lg">
      <ul className="flex flex-col gap-10 mt-10">
        {menuItems.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-md transition-all duration-200
                 ${isActive ? "bg-orange-500 text-white" : "hover:text-orange-400"}`
              }
            >
              {icon}
              <span className="text-xs">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
