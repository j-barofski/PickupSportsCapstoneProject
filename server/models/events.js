// create and join events
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
        title: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        latitude: { type: DataTypes.FLOAT, allowNull: false },
        longitude: { type: DataTypes.FLOAT, allowNull: false },
        time: { type: DataTypes.DATE, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        attendees: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
    }, {});
    Event.associate = (models) => {
        Event.belongsTo(models.Location, { foreignKey: 'locationId' });
    };
    return Event;
}