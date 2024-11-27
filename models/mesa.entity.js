const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Mesa = sequelize.define(
  "Mesa",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lugares: {
      type: DataTypes.INTEGER,  
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "creado_en",
    updatedAt: "modificado_en",
    tableName: "mesas",
  }
);

module.exports = Mesa;
