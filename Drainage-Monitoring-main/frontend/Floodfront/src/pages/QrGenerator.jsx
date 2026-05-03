import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QrGenerator() {
  const [officerId, setOfficerId] = useState("OFF123");

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Generate Officer QR Code</h2>

      <input
        type="text"
        value={officerId}
        onChange={(e) => setOfficerId(e.target.value)}
        placeholder="Enter Officer ID"
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <QRCodeCanvas
          value={officerId}
          size={250}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      <p style={{ marginTop: "20px" }}>
        QR Value: <strong>{officerId}</strong>
      </p>
    </div>
  );
}

export default QrGenerator;
