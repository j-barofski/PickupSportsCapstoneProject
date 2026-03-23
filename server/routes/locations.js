const express = require("express");
const router = express.Router();
const db = require("../models");

// Create
router.post("/", async (req, res) => {
    try {
        const location = await db.models.Location.create(req.body);
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Read
router.get("/", async (req, res) => {
    try {
        const locations = await db.models.Location.findAll(
            { include: db.models.Event }
        );
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const location = await db.models.Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ error: "Location unavailable" });
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
router.put("/:id", async (req, res) => {
    try {
        const location = await db.models.Location.findByPk(req.params.id);
        if (!location) {
            return res.json({ error: "Location unavailable" })
        }
        await location.update(req.body);
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const location = await db.models.Location.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ error: "Location unavailable" })
        }
        await location.destroy();
        res.json( { message: "Removed location" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;