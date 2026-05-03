import { useNavigate } from "react-router-dom";
import tnLogo from "./assets/tn-logo.png";
import { useEffect, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [isHover, setIsHover] = useState(false);   // 👈 ADD THIS

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>

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

      <div
        style={{
          ...styles.content,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.2s ease",
        }}
      >
        <h1 style={styles.title}>FloodGuard Tamil Nadu</h1>

        <p style={styles.subtitle}>
          Real-Time AI Driven Flood Intelligence & Smart Drainage Monitoring System
        </p>

        <button
          style={{
            ...styles.button,
            ...(isHover ? styles.buttonHover : {}),  // 👈 APPLY HOVER STYLE
          }}
          onMouseEnter={() => setIsHover(true)}     // 👈 ADD
          onMouseLeave={() => setIsHover(false)}    // 👈 ADD
          onClick={() => navigate("/roles")}
        >
          Enter Portal
        </button>
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

  content: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  title: {
    fontSize: "48px",
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: "18px",
    textShadow: "0 4px 15px rgba(0,0,0,0.4)",
  },

  subtitle: {
    fontSize: "19px",
    maxWidth: "700px",
    marginBottom: "35px",
    color: "#f2f2f2",
  },

  button: {
    padding: "20px 45px",
    fontSize: "17px",
    fontWeight: "600",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(to right, #002b5c, #004080)",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
  },

  buttonHover: {
    background: "linear-gradient(to right, #003366, #001f3f)",
    transform: "translateY(-4px) scale(1.06)",
    boxShadow: "0 14px 30px rgba(0,0,0,0.5)",
  },
};

export default Login;
