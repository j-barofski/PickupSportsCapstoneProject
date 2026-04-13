require('dotenv').config();
const express = require('express');
// const http = require('http');
const cors = require("cors");

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
router.get('/health', (req, res) => {
  res.status(200).send('Ok');
});

app.use('/api/v1', router);

// const server = http.createServer(app);
// server.listen(3000);

// sync to database
db.sync({ alter: true })
  .then(() => {
    console.log("Syncing to database");
    console.log(`Running server at http://localhost:${PORT}`);
  })
  .catch(error => {
    console.error("Error syncing to database", error);
  });

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// Only start server when running directly, not when testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;