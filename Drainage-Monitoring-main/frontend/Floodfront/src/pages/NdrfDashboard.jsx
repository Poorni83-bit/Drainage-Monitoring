import React, { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../firebase";


function NdrfDashboard() {
  const [motorStatus, setMotorStatus] = useState("Loading...");

  const logout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  // 🔥 Turn Motor ON
  const turnMotorOn = () => {
    set(ref(database, "motorStatus"), "ON");
  };

  // 🔥 Turn Motor OFF
  const turnMotorOff = () => {
    set(ref(database, "motorStatus"), "OFF");
  };

  // 👀 Listen to live motor status
  useEffect(() => {
    const motorRef = ref(database, "motorStatus");

    onValue(motorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMotorStatus(data);
      }
    });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>NDRF Dashboard</h2>
      <p>Monitor high-risk drain locations.</p>

      <h3>
        Motor Status:{" "}
        <span style={{ color: motorStatus === "ON" ? "green" : "red" }}>
          {motorStatus}
        </span>
      </h3>

      <button
        onClick={turnMotorOn}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Turn Motor ON
      </button>

      <button
        onClick={turnMotorOff}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Turn Motor OFF
      </button>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default NdrfDashboard;