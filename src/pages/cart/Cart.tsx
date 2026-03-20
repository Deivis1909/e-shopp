import { Navbar } from "../../components/Navbar";
import type { Product } from "../../components/ProductCard";
import { useState } from "react";

export function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  const removeFromCart = (productId: string) => {
    const index = cart.findIndex(p => p.id === productId);
    if (index === -1) return;
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((acc, p) => acc + p.price, 0);

  return (
    <>
      <Navbar cartCount={cart.length} total={total} />
      <div style={{ padding: "20px" }}>
        <h2>Carrinho</h2>
        {cart.length === 0 && <p>O carrinho está vazio.</p>}
        {cart.map(item => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <img src={item.image} alt={item.title} style={{ width: "50px", marginRight: "10px" }} />
            <span style={{ flexGrow: 1 }}>{item.title} - R$ {item.price.toFixed(2)}</span>
            <button onClick={() => removeFromCart(item.id)} style={{ padding: "5px 10px", backgroundColor: "#c00", color: "#fff", border: "none", borderRadius: "4px" }}>Remover</button>
          </div>
        ))}
        {cart.length > 0 && <p>Total: R$ {total.toFixed(2)}</p>}
      </div>
    </>
  );
}