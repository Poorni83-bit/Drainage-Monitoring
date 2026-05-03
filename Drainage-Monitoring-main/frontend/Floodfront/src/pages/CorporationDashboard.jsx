import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { db } from "../firebase";
import { ref, get, onValue, update } from "firebase/database";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import tnLogo from "../assets/tn-logo.png";
import "leaflet/dist/leaflet.css";

/* Fix Leaflet default icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function CorporationDashboard() {
  const qrRef = useRef(null);

  const [officerData, setOfficerData] = useState(null);
  const [drainage, setDrainage] = useState(null);
  const [officersList, setOfficersList] = useState({});
  const [selectedOfficer, setSelectedOfficer] = useState("");

  const logout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  /* Load officers */
  useEffect(() => {
    const officersRef = ref(db, "officers");
    onValue(officersRef, (snapshot) => {
      if (snapshot.exists()) {
        setOfficersList(snapshot.val());
      }
    });
  }, []);

  /* Start QR */
  useEffect(() => {
    startScanner();
    return () => {
      if (qrRef.current) {
        qrRef.current.stop().catch(() => {});
        qrRef.current = null;
      }
    };
  }, []);

  const startScanner = async () => {
    if (qrRef.current) return;

    const qr = new Html5Qrcode("reader");
    qrRef.current = qr;

    await qr.start(
      { facingMode: "user" },
      { fps: 10, qrbox: 250 },
      async (decodedText) => {
        await fetchOfficer(decodedText);
        await qr.stop().catch(() => {});
        await qr.clear().catch(() => {});
        qrRef.current = null;
      }
    );
  };

  const fetchOfficer = async (id) => {
    const snapshot = await get(ref(db, `officers/${id}`));
    if (snapshot.exists()) {
      const officer = snapshot.val();
      setOfficerData(officer);

      const drainageRef = ref(db, `drainageStatus/${officer.area}`);
      onValue(drainageRef, (snap) => {
        if (snap.exists()) setDrainage(snap.val());
      });
    } else {
      alert("No officer found");
    }
  };

  const appointOfficer = async () => {
    if (!selectedOfficer || !officerData)
      return alert("Select officer");

    const selected = officersList[selectedOfficer];

    await update(
      ref(db, `drainageStatus/${officerData.area}`),
      {
        assignedOfficerId: selectedOfficer,
        assignedOfficerName: selected.name,
      }
    );

    alert("Officer Assigned Successfully!");
  };

  const markWorkCompleted = async () => {
    await update(
      ref(db, `drainageStatus/${officerData.area}`),
      {
        blocked: false,
        workCompleted: true,
      }
    );
  };

  const scanAgain = () => {
    setOfficerData(null);
    setDrainage(null);
    setSelectedOfficer("");
    startScanner();
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
          min-height: 100vh;
          width: 100%;
          font-family: 'Segoe UI', serif;
          overflow-y: auto;
        }

        .background {
          background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/4f/Fort_St._George%2C_Chennai.jpg');
          background-size: cover;
          background-position: center;
          position: fixed;
          height: 100%;
          width: 100%;
          filter: blur(4px) brightness(1.15);
          z-index: -2;
        }

        .overlay {
          position: fixed;
          height: 100%;
          width: 100%;
          background: linear-gradient(135deg, rgba(0,40,85,0.6), rgba(0,80,150,0.5));
          z-index: -1;
        }

        .navbar {
          width: 100%;
          padding: 18px 50px;
          background-color: rgba(255,255,255,0.96);
          border-bottom: 4px solid #002b5c;
          display: flex;
          align-items: center;
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

        .content {
          padding: 40px;
          text-align: center;
          color: white;
        }

        .dashboard-title {
          font-size: 30px;
          font-weight: 700;
          margin-top: 20px;
        }

        .subtitle {
          margin-bottom: 30px;
        }

        .officer-card {
          background: rgba(255,255,255,0.97);
          padding: 35px;
          border-radius: 25px;
          width: 520px;
          margin: 40px auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          color: black;
        }

        .officer-card p {
          margin: 6px 0;
        }

        .status-text {
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
        }

        .dropdown {
          margin-top: 15px;
          padding: 10px;
          width: 100%;
          border-radius: 8px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin: 8px 5px;
        }

        .btn-orange {
          background: #ff9800;
          color: white;
        }

        .btn-blue {
          background: linear-gradient(to right, #002b5c, #004080);
          color: white;
        }

        .btn-gray {
          background: #555;
          color: white;
        }

        .map-section {
          margin-top: 60px;
        }

        .map-wrapper {
          width: 85%;
          height: 500px;
          margin: 0 auto 60px auto;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }

        .logout-btn {
          margin-bottom: 60px;
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

        <div className="content">
          <h2 className="dashboard-title">
            🏢 Corporation Dashboard
          </h2>
          <p className="subtitle">
            Scan Officer ID to View Details & Drainage Status
          </p>

          {!officerData && (
            <div id="reader" style={{ width: "320px", margin: "30px auto" }} />
          )}

          {officerData && (
            <div className="officer-card">
              <h3>Officer Details</h3>
              <p><b>Name:</b> {officerData.name}</p>
              <p><b>Phone:</b> {officerData.phone}</p>
              <p><b>Area:</b> {officerData.area}</p>
              <p><b>Designation:</b> {officerData.designation}</p>

              {drainage && (
                <>
                  <h3 style={{ marginTop: "15px" }}>Drainage Status</h3>
                  <p className="status-text" style={{
                    color: drainage.blocked ? "red" : "#003366"
                  }}>
                    {drainage.blocked
                      ? "🔴 Drainage Blocked"
                      : "🔵 Work Completed"}
                  </p>

                  {drainage.assignedOfficerName && (
                    <p>👷 Assigned: {drainage.assignedOfficerName}</p>
                  )}

                  <select
                    value={selectedOfficer}
                    onChange={(e) => setSelectedOfficer(e.target.value)}
                    className="dropdown"
                  >
                    <option value="">Select Officer</option>
                    {Object.keys(officersList).map((id) => (
                      <option key={id} value={id}>
                        {officersList[id].name} ({officersList[id].designation})
                      </option>
                    ))}
                  </select>

                  <button className="btn btn-orange" onClick={appointOfficer}>
                    Appoint Officer
                  </button>

                  <button className="btn btn-blue" onClick={markWorkCompleted}>
                    Mark Work Completed
                  </button>
                </>
              )}

              <button className="btn btn-gray" onClick={scanAgain}>
                Scan Again
              </button>
            </div>
          )}

          {drainage && drainage.location && (
            <div className="map-section">
              <div className="map-wrapper">
                <MapContainer
                  center={[drainage.location.lat, drainage.location.lng]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  <Marker
                    position={[drainage.location.lat, drainage.location.lng]}
                    icon={
                      new L.Icon({
                        iconUrl: drainage.blocked
                          ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                          : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        iconSize: [32, 32],
                      })
                    }
                  >
                    <Popup>
                      {drainage.blocked
                        ? "🚨 Drainage Blocked"
                        : "✅ Work Completed"}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          )}

          <button className="btn btn-blue logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default CorporationDashboard;
