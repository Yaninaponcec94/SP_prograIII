const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const ObraDeArte = sequelize.define(
  "ObraDeArte",
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
    anioDeCreacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['pintura', 'escultura']],
      },
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    },
  },
  {
    timestamps: true,
    createdAt: "creadoEn", 
    updatedAt: "modificadoEn", 
    tableName: "obras_de_arte",
  }
);

module.exports = ObraDeArte;
