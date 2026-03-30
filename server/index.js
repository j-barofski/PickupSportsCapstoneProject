const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

// post location
app.post("/api/locations", async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        console.log("Location:", latitude, longitude);

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


// test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// start server AFTER DB loads
db.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
  });
});