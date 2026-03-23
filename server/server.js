const express = require('express');
const http = require('http');

const app = express();
const router = express.Router();
app.use(express.json());

const db = require("./models");

// routes
const eventsRoutes = require("./routes/events");
const locationsRoutes = require("./routes/locations");

app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/locations", locationsRoutes);

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

router.get('/health', (req, res) => {
  res.status(200).send('Ok');
});


app.use('/api/v1', router);

const server = http.createServer(app);
server.listen(3000);

// sync to database
db.sync()
  .then(() => {
    console.log("Syncing to database");
  })
  .catch(error => {
    console.error("Error syncing to database", error);
  })


// outer.get('/health', (req, res) => {
//     const data = {
//       uptime: process.uptime(),
//       message: 'Ok',
//       date: new Date()
//     }
  
//     res.status(200).send(data);
//   });