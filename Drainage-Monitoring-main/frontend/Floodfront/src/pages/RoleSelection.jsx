import { useNavigate } from "react-router-dom";
import { FaUser, FaBuilding, FaShieldAlt } from "react-icons/fa";
import tnLogo from "../assets/tn-logo.png";
import { useEffect, useState } from "react";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const goToDashboard = (role) => {
    localStorage.setItem("role", role);
    navigate("/dashboard");
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page {
          height: 100vh;
          width: 100%;
          position: relative;
          font-family: 'Segoe UI', serif;
          overflow: hidden;
        }

        .background {
          background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/4f/Fort_St._George%2C_Chennai.jpg');
          background-size: cover;
          background-position: center;
          position: absolute;
          height: 100%;
          width: 100%;
          filter: blur(4px) brightness(1.15);
        }

        .overlay {
          position: absolute;
          height: 100%;
          width: 100%;
          background: linear-gradient(135deg, rgba(0,40,85,0.6), rgba(0,80,150,0.5));
        }

        .navbar {
          position: absolute;
          top: 0;
          width: 100%;
          padding: 18px 50px;
          background-color: rgba(255,255,255,0.96);
          border-bottom: 4px solid #002b5c;
          display: flex;
          align-items: center;
          z-index: 2;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo {
          height: 65px;
        }

        .gov-text {
          font-size: 18px;
          font-weight: 700;
          color: #001f3f;
        }

        .dept-text {
          font-size: 14px;
          color: #555;
        }

        .role-container {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          font-size: 42px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 50px;
          text-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }

        .cards-wrapper {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .card {
          width: 280px;
          height: 280px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          cursor: pointer;
          opacity: 0;
          transform: translateY(100px);
          transition: all 0.8s ease;
        }

        .card.show {
          opacity: 1;
          transform: translateY(0);
        }

        .card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
        }

        .icon {
          font-size: 55px;
          color: #002b5c;
          margin-bottom: 15px;
        }

        .card h2 {
          margin-bottom: 18px;
          color: #002b5c;
          font-weight: 700;
        }

        .enter-btn {
          padding: 14px 30px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 6px;
          border: none;
          background: linear-gradient(to right, #002b5c, #004080);
          color: #fff;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }

        .enter-btn:hover {
          background: linear-gradient(to right, #003366, #001f3f);
          transform: translateY(-4px) scale(1.06);
          box-shadow: 0 14px 30px rgba(0,0,0,0.5);
        }
      `}</style>

      <div className="page">
        <div className="background"></div>
        <div className="overlay"></div>

        <div className="navbar">
          <div className="logo-section">
            <img src={tnLogo} alt="Tamil Nadu Logo" className="logo" />
            <div>
              <div className="gov-text">
                Government of Tamil Nadu
              </div>
              <div className="dept-text">
                Smart Drainage & Flood Monitoring Authority
              </div>
            </div>
          </div>
        </div>

        <div className="role-container">
          <h1 className="title">Select Portal</h1>

          <div className="cards-wrapper">

            <div className={`card ${loaded ? "show" : ""}`} style={{ transitionDelay: "0.2s" }}>
              <FaUser className="icon" />
              <h2>Citizen Portal</h2>
              <button className="enter-btn" onClick={() => goToDashboard("citizen")}>
                Enter
              </button>
            </div>

            <div className={`card ${loaded ? "show" : ""}`} style={{ transitionDelay: "0.4s" }}>
              <FaBuilding className="icon" />
              <h2>Corporation Portal</h2>
              <button className="enter-btn" onClick={() => goToDashboard("corporation")}>
                Enter
              </button>
            </div>

            <div className={`card ${loaded ? "show" : ""}`} style={{ transitionDelay: "0.6s" }}>
              <FaShieldAlt className="icon" />
              <h2>NDRF Portal</h2>
              <button className="enter-btn" onClick={() => goToDashboard("ndrf")}>
                Enter
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
