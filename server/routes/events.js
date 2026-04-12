const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");

// Create
router.post("/", async (req, res) => {
    try {
        const { title, location, latitude, longitude, description, attendees, time } = req.body;
        const event = await db.models.Event.create({
            title, 
            location,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            description,
            attendees: parseInt(attendees),
            time
        });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Read
router.get("/", async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const range = 1;

        const events = await db.models.Event.findAll({
            where: {
                latitude: { [Op.between]: [lat - range, lat + range] },
                longitude: { [Op.between]: [lng - range, lng + range] }
            }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.get("/:id", async (req, res) => {
    try {
        const event = await db.models.Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event unavailable" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Update
router.put("/:id", async (req, res) => {
    try {
        const event = await db.models.Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event unavailable" })
        }
        const { title, location, latitude, longitude, description, attendees, time } = req.body;
        await event.update({
            title,
            location,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            description,
            attendees: parseInt(attendees),
            time
        });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const event = await db.models.Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event unavailable" })
        }
        await event.destroy();
        res.json( { message: "Removed event" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Join Event
router.put("/:id/join", async (req, res) => {
    try {
        const event = await db.models.Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event unavailable" });
        }
        await event.increment("attendees");
        res.json(await event.reload());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;