import CartItems from "../components/CartItems";

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
