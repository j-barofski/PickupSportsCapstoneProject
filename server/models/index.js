const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({ 
    dialect: "sqlite", 
    storage: path.join(__dirname, "..", "app.db"), 
    logging: false
})

fs.readdirSync(__dirname).filter(
    f => f !== "index.js" && f.endsWith(".js")
    ).forEach(file => {
        const makeModel = require(path.join(__dirname, file));
        const model = makeModel(db, DataTypes);
        db.models[model.name] = model;
    });

// associations
Object.values(db.models).forEach(model => {
    if (typeof model.associate === "function") {
        model.associate(db.models);
    }
});

module.exports = db;