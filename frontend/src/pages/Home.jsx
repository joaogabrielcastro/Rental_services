import React from "react";
import Main from "../components/Main";

function Home({ adicionarAoCarrinho }) {
  return (
    <div className="flex">
      <div className="ml-[80px]">
        <Main adicionarAoCarrinho={adicionarAoCarrinho} />
      </div>
    </div>
  );
}

export { Home };
