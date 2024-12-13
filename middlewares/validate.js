const { body, param, validationResult } = require("express-validator");

const validate = {

  createObra: [
    body("nombre").isString().withMessage("El nombre debe ser un string."),
    body("tipo")
      .isIn(["pintura", "escultura"])
      .withMessage("El tipo debe ser 'pintura' o 'escultura'."),
    body("anioDeCreacion").isInt().withMessage("El año de creación debe ser un número entero."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  updateObra: [

    param("id")
      .isInt({ min: 1 })
      .withMessage("El ID debe ser un número entero positivo."),

    body("nombre")
      .isString()
      .notEmpty()
      .withMessage("El nombre debe ser un string y no puede estar vacío."),

    body("tipo")
      .isIn(["pintura", "escultura"])
      .withMessage("El tipo debe ser 'pintura' o 'escultura'."),

    body("anioDeCreacion")
      .isInt({ min: 0 })
      .withMessage("El año de creación debe ser un número entero positivo."),
    
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  

  idObra: [
    param("id").isInt().withMessage("El ID debe ser un número entero."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

module.exports = validate;
