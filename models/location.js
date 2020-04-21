module.exports = function (sequelize, DataTypes) {
    const Location = sequelize.define("Location", {
        // Giving the Author model a name of type STRING
        locationId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cords: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
            validate: {
                isFloat:true
            }
        },
       
    });
    Location.associate = function (models) {
        // Associating Location with Content
        // When an Location is deleted, also delete any associated Content
        Location.hasMany(models.Content, {
            onDelete: "cascade"
        });
    };
    return Location;
};module.exports = function (sequelize, DataTypes) {
    const Location = sequelize.define("Location", {
        // Giving the Author model a name of type STRING
        locationId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cords: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
            validate: {
                isFloat:true
            }
        },
    });
    Location.associate = function (models) {
        // Associating Location with Content
        // When an Location is deleted, also delete any associated Content
        Location.hasMany(models.Content, {
            onDelete: "cascade"
        });
    };
    return Location;
};