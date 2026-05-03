import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function CitizenPortal() {
  const [drainage, setDrainage] = useState(null);

  const redIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
  });

  const blueIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [32, 32],
  });

  const greenIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
  });

  useEffect(() => {
    const drainageRef = ref(db, "drainageStatus/Zone1");

    onValue(drainageRef, (snap) => {
      if (snap.exists()) {
        setDrainage(snap.val());
      }
    });
  }, []);

  const approveWork = async () => {
    const drainageRef = ref(db, "drainageStatus/Zone1");
    await update(drainageRef, { approvedByCitizen: true });
  };

  if (!drainage) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>Citizen Portal</h2>

      {drainage.blocked && !drainage.workCompleted && (
        <p style={{ color: "red" }}>🔴 Drainage Blocked</p>
      )}

      {drainage.workCompleted && !drainage.approvedByCitizen && (
        <>
          <p style={{ color: "blue" }}>🔵 Work Completed</p>
          <button onClick={approveWork}>Approve Work</button>
        </>
      )}

      {drainage.approvedByCitizen && (
        <p style={{ color: "green" }}>🟢 Fully Resolved</p>
      )}

      <MapContainer
        center={drainage.location}
        zoom={14}
        style={{ height: "400px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={drainage.location}
          icon={
            drainage.approvedByCitizen
              ? greenIcon
              : drainage.workCompleted
              ? blueIcon
              : redIcon
          }
        />
      </MapContainer>
    </div>
  );
}
