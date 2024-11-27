const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Silla = sequelize.define(
  "Silla",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    MesaId: {
      type: DataTypes.INTEGER,
      references: {
        model: "mesas",  // Asegúrate de que el nombre de la tabla sea "mesas" (en minúsculas)
        key: "id",
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activo: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "creado_en",
    updatedAt: "modificado_en",
    tableName: "sillas",  // Asegúrate de que sea "sillas"
  }
);



module.exports = Silla;

