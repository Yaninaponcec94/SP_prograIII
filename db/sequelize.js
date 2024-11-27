require('dotenv').config();
const { Sequelize } = require('sequelize');

// Crear la instancia de Sequelize
const sequelizeInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Verifica la conexión a la base de datos
sequelizeInstance.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });



// Sincronizar la base de datos
sequelizeInstance.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

module.exports = sequelizeInstance;

