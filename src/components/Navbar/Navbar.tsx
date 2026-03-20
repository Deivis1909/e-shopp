import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import "./Navbar.css";

type Props = {
  cartCount: number;
  total: number;
};

export function Navbar({ cartCount, total }: Props) {
  const [email, setEmail] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail(null);
      // redirecionar para login, se quiser:
      // navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav className="navbar">
      <h1>e-Shopp</h1>

      <div className="navbar-right">
        {email && <span className="user-email">👤 {email}</span>}
        {email && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}

        <div className="cart-info">
          <span className="cart-icon">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </span>
          <span>Total: R$ {total.toFixed(2)}</span>
        </div>
      </div>
    </nav>
  );
}