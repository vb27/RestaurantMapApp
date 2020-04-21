module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        // Giving the Author model a name of type STRING


        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 16]
            }
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 12]
            }
        }
    });

    User.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Location, {
            onDelete: "cascade"
        });
    };

    return User;
};