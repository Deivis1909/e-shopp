import "./Navbar.css";

type Props = {
  cartCount: number;
  total: number;
};

export function Navbar({ cartCount, total }: Props) {
  return (
    <nav className="navbar">
      <h1>e-Shopp</h1>
      <div className="cart-info">
        <span className="cart-icon">
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </span>
        <span>Total: R$ {total.toFixed(2)}</span>
      </div>
    </nav>
  );
}