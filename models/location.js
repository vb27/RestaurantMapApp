 module.exports = function (sequelize, DataTypes) {
     const Location = sequelize.define("locations", {
         // Giving the Author model a name of type STRING
         locationId: {
             type: DataTypes.INTEGER,
             autoIncrement: true,
             primaryKey: true
         },

         name: {
             unique: true,
             type: DataTypes.STRING,
             //  allowNull: false,
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
         },
         lat: {


             type: DataTypes.DECIMAL(10, 4),


             long: {


                 type: DataTypes.DECIMAL(10, 4),

             },
         }
     });
     Location.associate = function (models) {
         // Associating Location with Content
         // When an Location is deleted, also delete any associated Content
         Location.belongsTo(models.user, {
             onDelete: "cascade"
         });
     };
     return Location;

 };