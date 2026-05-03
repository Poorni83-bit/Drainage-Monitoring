const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("FloodGuard Backend Running");
});


app.get("/api/area/:areaName", (req, res) => {
  const area = req.params.areaName;

  if (area === "t_nagar") {
    res.json({
      center: { lat: 13.0418, lng: 80.2341 },
      bins: [
        { lat: 13.042, lng: 80.235 },
        { lat: 13.040, lng: 80.233 }
      ],
      drainage: [
        { lat: 13.041, lng: 80.232 },
        { lat: 13.043, lng: 80.236 }
      ],
      blockage: true
    });
  } else {
    res.json({
      center: { lat: 13.0827, lng: 80.2707 },
      bins: [],
      drainage: [],
      blockage: false
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
