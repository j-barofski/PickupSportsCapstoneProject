const express = require("express");
const cors = require("cors");
const db = require("./models");
console.log("Models loaded:", Object.keys(db.models));

const app = express();

const corsMethods = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsMethods));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

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
db.sync()
  .then(() => {
    console.log("Syncing to database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error syncing to database", error);
  });