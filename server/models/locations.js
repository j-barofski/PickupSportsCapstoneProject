// locations available
module.exports =  (sequelize, DataTypes) => {
    const Location = sequelize.define("Location", {
        name: { type: DataTypes.STRING, allowNull: false },
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING
    });
    Location.associate = (models) => {
        Location.hasMany(models.Event, { foreignKey: 'locationId' });
    };
    return Location;
}