import CartItems from "../components/Cartitems.jsx";

function Cart({ itensCarrinho, atualizarQuantidade, removerDoCarrinho }) {
  return (
    <div className="ml-[80px]">
      <CartItems
        itensCarrinho={itensCarrinho}
        atualizarQuantidade={atualizarQuantidade}
        removerDoCarrinho={removerDoCarrinho}
      />
    </div>
  );
}

export { Cart };
