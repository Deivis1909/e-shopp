import { useState } from "react";
import { FirebaseError } from "firebase/app";
import "./Login.css";
import { login, register } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      await register(email, password);
      alert("Usuário criado!");
    } catch (err: unknown) {
  if (err instanceof FirebaseError) {
    setError(err.message);
  } else {
    setError("Erro inesperado.");
  }
}

    setLoading(false);
  };

  const handleLogin = async () => {

    
    await login(email, password);
    navigate("/home");
    

    try {
      await login(email, password);
      alert("Logado com sucesso!");
    }catch (err: unknown) {
  if (err instanceof FirebaseError) {
    setError(err.message);
  } else {
    setError("Erro inesperado.");
  }
}



    setLoading(false);
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>E-Shopp</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="show-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </span>
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <button
          className="register"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Criar conta"}
        </button>
      </div>
    </div>
  );
}