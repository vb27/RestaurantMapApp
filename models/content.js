module.exports = function (sequelize, DataTypes) {
    const Content = sequelize.define("User", {
        // Giving the Author model a name of type STRING


        contentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        review: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        }

    });
    // Content.associate = function (models) {
    //     // Associating Location with Content
    //     // When an Location is deleted, also delete any associated Content
    //     Content.hasMany(models.Content, {
    //         onDelete: "cascade"
    //     });
    // };

    return Content;
};