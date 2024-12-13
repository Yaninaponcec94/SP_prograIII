const Log = require("../models/log.entity"); 

const logMiddleware = async (req, res, next) => {
  try {
    await Log.create({
      ruta: req.originalUrl,
      metodo: req.method,    
    });
   
    next();
  } catch (error) {
    console.error("Error al crear el log:", error);
    next(); 
  }
};

module.exports = logMiddleware;
