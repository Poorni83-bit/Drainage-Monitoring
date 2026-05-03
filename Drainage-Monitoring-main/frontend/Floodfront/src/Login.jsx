import { useNavigate } from "react-router-dom";
import tnLogo from "./assets/tn-logo.png";
import { useEffect, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div style={styles.page}>
     
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>

      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logoSection}>
          <img src={tnLogo} alt="Tamil Nadu Logo" style={styles.logo} />
          <div>
            <div style={styles.govText}>
              Government of Tamil Nadu
            </div>
            <div style={styles.deptText}>
              Smart Drainage & Flood Monitoring System
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          ...styles.content,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <h1 style={styles.title}>FloodGuard Tamil Nadu</h1>

        <p style={styles.subtitle}>
          Real-Time Monitoring and Intelligent Drainage Management
          System for Flood Prevention
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/roles")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#003f7d")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056a6")
          }
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
    fontFamily: "Arial, sans-serif",
  },

  background: {
    backgroundImage:
      "url('https://upload.wikimedia.org/wikipedia/commons/4/4f/Fort_St._George%2C_Chennai.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    filter: "blur(4px)",
  },

  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.85)",
  },

  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    padding: "15px 40px",
    backgroundColor: "#ffffff",
    borderBottom: "3px solid #0056a6",
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
    height: "60px",
  },

  govText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000",
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
    padding: "20px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#003366",
    marginBottom: "15px",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "600px",
    marginBottom: "30px",
    color: "#333",
  },

  button: {
    padding: "12px 40px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#0056a6",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Login;