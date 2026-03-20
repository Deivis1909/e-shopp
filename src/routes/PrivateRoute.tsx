import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function PrivateRoute({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Enquanto verifica o login
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Carregando...</p>
      </div>
    );
  }

  // Se não estiver logado → volta pro login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Se estiver logado → libera acesso
  return children;
}