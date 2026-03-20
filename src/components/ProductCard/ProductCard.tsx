import { useState } from "react";
import "./ProductCard.css";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

type Props = {
  product: Product;
  onAddToCart: () => void;
};

export function ProductCard({ product, onAddToCart }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="product-card">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
          onClick={openModal}
        />
        <div className="product-card__info">
          <h3>{product.title}</h3>
          <p>R$ {product.price.toFixed(2)}</p>
        </div>
        <button className="product-card__btn" onClick={onAddToCart}>
          ➕
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={product.image} alt={product.title} />
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}