import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, set, onValue } from "firebase/database";

export default function CorporationPortal() {
  const [officerName, setOfficerName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [location, setLocation] = useState("");

  const [blockages, setBlockages] = useState([]);

  // 🔹 Fetch Officers Real-time
  useEffect(() => {
    const officerRef = ref(db, "officers");
    onValue(officerRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        list.push({ id, ...data[id] });
      }
      setOfficers(list);
    });
  }, []);

  // 🔹 Fetch Blockage Alerts Real-time
  useEffect(() => {
    const blockRef = ref(db, "blockages");
    onValue(blockRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        list.push(data[id]);
      }
      setBlockages(list);
    });
  }, []);

  // 🔹 Add Officer
  const addOfficer = () => {
    const newRef = push(ref(db, "officers"));
    set(newRef, {
      name: officerName,
      phone: phone,
      area: area,
    });
    alert("Officer Added!");
    setOfficerName("");
    setPhone("");
    setArea("");
  };

  // 🔹 Assign Work
  const assignWork = () => {
    const newRef = push(ref(db, "assignments"));
    set(newRef, {
      officerId: selectedOfficer,
      location: location,
      status: "Pending",
    });
    alert("Work Assigned!");
    setLocation("");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🏢 Corporation Portal</h2>

      {/* Add Officer */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Add Officer</h3>
        <input
          placeholder="Officer Name"
          value={officerName}
          onChange={(e) => setOfficerName(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <button onClick={addOfficer}>Add Officer</button>
      </div>

      {/* Assign Work */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Assign Work</h3>
        <select onChange={(e) => setSelectedOfficer(e.target.value)}>
          <option>Select Officer</option>
          {officers.map((off) => (
            <option key={off.id} value={off.id}>
              {off.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Blockage Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={assignWork}>Assign</button>
      </div>

      {/* Live Blockage Alerts */}
      <div>
        <h3>🚨 Real-Time Blockage Alerts</h3>
        {blockages.map((b, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            📍 {b.location} | 💧 {b.waterLevel} | ⏰ {b.time}
          </div>
        ))}
      </div>
    </div>
  );
}
