const express = require("express");
const router = express.Router();
const db = require("../models");

// Create
router.post("/", async (req, res) => {
    try {
        const event = await db.models.Event.create(req.body);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Read
router.get("/", async (req, res) => {
    try {
        const events = await db.models.Event.findAll(
            { include: db.models.Location }
        );
        res.json(events);
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
        await event.update(req.body);
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

module.exports = router;