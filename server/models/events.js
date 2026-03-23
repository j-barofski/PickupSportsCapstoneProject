// create and join events
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
        sport: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        time: { type: DataTypes.DATE, allowNull: false },
        description: DataTypes.TEXT
    }, {});
    Event.associate = (models) => {
        Event.belongsTo(models.Location, { foreignKey: 'locationId' });
    };
    return Event;
}