 module.exports = function (sequelize, DataTypes) {
     const Location = sequelize.define("locations", {
         // Giving the Author model a name of type STRING
         locationId: {
             type: DataTypes.INTEGER,
             autoIncrement: true,
             primaryKey: true
         },
         locationName: {
             type: DataTypes.STRING,
             allowNull: false,

         },
         locationTitle: {
             type: DataTypes.STRING,
             unique: true,
             allowNull: false,
             // validate:{
             //     notNull:{args:true,msg: "Enter"}
             // }
         },
         locationDescription: {
             type: DataTypes.TEXT,
             allowNull: false,

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
         Location.hasMany(models.content, {
             onDelete: "cascade"
         });
     };
     return Location;

 };