import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tnLogo from "../assets/tn-logo.png";

export default function CitizenLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHover, setIsHover] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all details");
      return;
    }

    localStorage.setItem("role", "citizen");

    navigate("/dashboard");
  };

  return (
    <div style={styles.page}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.logoSection}>
          <img src={tnLogo} alt="Tamil Nadu Logo" style={styles.logo} />
          <div>
            <div style={styles.govText}>
              Government of Tamil Nadu
            </div>
            <div style={styles.deptText}>
              Smart Drainage & Flood Monitoring Authority
            </div>
          </div>
        </div>
      </div>

      {/* LOGIN BOX */}
      <div style={styles.container}>
        <div style={styles.box}>
          <h2 style={styles.heading}>Citizen Login</h2>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isHover ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    position: "relative",
    fontFamily: "'Segoe UI', serif",
    overflow: "hidden",
  },

  background: {
    backgroundImage:
      "url('https://upload.wikimedia.org/wikipedia/commons/4/4f/Fort_St._George%2C_Chennai.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    filter: "blur(4px) brightness(1.15)",
  },

  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    background:
      "linear-gradient(135deg, rgba(0,40,85,0.6), rgba(0,80,150,0.5))",
  },

  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    padding: "18px 50px",
    backgroundColor: "rgba(255,255,255,0.96)",
    borderBottom: "4px solid #002b5c",
    display: "flex",
    alignItems: "center",
    zIndex: 2,
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  logo: {
    height: "65px",
  },

  govText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#001f3f",
  },

  deptText: {
    fontSize: "14px",
    color: "#555",
  },

  container: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "400px",
    padding: "50px",
    borderRadius: "15px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    textAlign: "center",
    color: "white",
  },

  // 🔵 Gradient Blue Heading (Same as button)
  heading: {
    marginBottom: "37px",
    fontWeight: "700",
    fontSize: "30px",
    background: "linear-gradient(to right, #002b5c, #004080)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    
    
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  input: {
    width: "95%",
    padding: "15px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },

  button: {
    width: "60%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(to right, #002b5c, #004080)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  buttonHover: {
    background: "linear-gradient(to right, #003366, #001f3f)",
    transform: "translateY(-3px) scale(1.05)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.5)",
  },
};
