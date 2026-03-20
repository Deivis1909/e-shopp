import './HomePage.css';

import  {Navbar}  from '../../components/Navbar';
import  { ProductCard } from '../../components/ProductCard';
import type { Product } from '../../components/ProductCard';
//import  productsData from '../../data/products.json';

import { useState, useEffect } from "react";
export function HomePage() {

  
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // Pegar produtos do JSON via fetch
  useEffect(() => {
    fetch("data/products.json")
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

  const addToCart = (product: Product) => setCart(prev => [...prev, product]);

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const index = prev.findIndex(p => p.id === productId);
      if (index === -1) return prev;
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const total = cart.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="app-container">
      <Navbar cartCount={cart.length} total={total} />

      <div className="main-content">
        <div className="products-list">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>

        {/* Carrinho lateral */}
        <div className="cart-sidebar">
          <h2>Carrinho 🛒</h2>
          {cart.length === 0 && <p>O carrinho está vazio.</p>}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
                <span>R$ {item.price.toFixed(2)}</span>
                <button className="cart-item__delete" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))}
          </div>
          {cart.length > 0 && <p className="cart-total">Total: R$ {total.toFixed(2)}</p>}
        </div>
      </div>
    </div>
  );
}

export default HomePage;