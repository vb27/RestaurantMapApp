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
         cords: {

            
             type: DataTypes.GEOMETRY('POINT'),
             //  allowNull: false,
             validate: {
                 isFloat: true
             }
         },
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