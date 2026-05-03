import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function NDRFLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("role", "ndrf");
    localStorage.setItem("ndrfId", id);
    navigate("/ndrf-dashboard");
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>NDRF Login</h2>
        <input type="text" placeholder="NDRF ID" value={id} onChange={e => setId(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default NDRFLogin;
