require('dotenv').config();
const express = require('express');
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

// routes
const eventsRoutes = require("./routes/events");
const locationsRoutes = require("./routes/locations");

app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/locations", locationsRoutes);

// health
app.get('/health', (req, res) => {
  res.status(200).send('Ok');
});

app.use('/api/v1', router);

app.get("/", (req, res) => {
  res.send("Running");
});

// sync to database
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


// Only start server when running directly, not when testing
// if (require.main === module) {
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// }

module.exports = app;