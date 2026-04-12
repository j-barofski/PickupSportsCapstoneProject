const express = require("express");
const cors = require("cors");
const db = require("./models");
console.log("Models loaded:", Object.keys(db.models));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const eventsRoutes = require("./routes/events");
const locationsRoutes = require("./routes/locations");

app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/locations", locationsRoutes);

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
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok" });
});


// start server AFTER DB loads
db.sync({ alter: true }).then(() => {
  console.log("Synced to database");
  app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
  });
}).catch(err => {
  console.log("Error trying to sync: ", err);
});