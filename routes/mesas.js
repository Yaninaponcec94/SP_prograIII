const express = require('express');
const router = express.Router();
const Mesa = require('../models/mesa.entity');
const Silla = require('../models/silla.entity');
const upload = require("../storage/storage");

const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).send("Error del servidor");
};

router.get("/", async (req, res, next) => {
  try {
      const mesas = await Mesa.findAll({
        where:{
          activo: true,
        }
      });
      res.render("mesas", { mesas }); 
  } catch (err) {
      next(err); 
  }
});

router.post("/nueva", upload.single("imagen"), async (req, res, next) => {
  try {
      const { nombre, lugares } = req.body;

      if (!isNaN(Number(lugares)) && typeof nombre === "string") {
          await Mesa.create({
              nombre,
              lugares,
              imagen: req.file ? req.file.filename : null,  
          });

          res.render("mensaje", { mensaje: "Mesa creada con éxito" });
      } else {
          res.render("mensaje", { mensaje: "Error en los datos" });
      }
  } catch (err) {
      next(err); 
  }
});

router.get('/relaciones/:id', async (req, res, next) => {
  const mesaId = req.params.id;

  try {
      const mesa = await Mesa.findByPk(mesaId, {  
        include: {
          model: Silla,
          as: 'Sillas' 
        }
      });
      console.log(mesa.sillas); 
      if (!mesa) {
          return res.status(404).send('Mesa no encontrada');
      }
      res.render('relaciones-mesas', { mesa });
  } catch (err) {
      next(err);
  }
});


router.put("/:id", upload.single("imagen"), async (req, res, next) => {
  try {
    const updateData = req.file 
        ? { ...req.body, imagen: req.file.filename }  // Si hay una imagen nueva, agrégala
        : req.body;  // Si no hay imagen nueva, solo actualiza el body

    await Mesa.update(updateData, {
      where: { id: req.params.id },
    });

    res.render("mensaje", { mensaje: "Mesa actualizada con éxito" });
  } catch (err) {
    res.render("mensaje", { mensaje: "Error al actualizar la mesa: " + err.message });
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Mesa.update(
      { activo: false },  // Desactivamos la mesa (baja lógica)
      { where: { id: req.params.id } }
    );
    res.render("mensaje", { mensaje: "Mesa desactivada con éxito" });
  } catch (err) {
    res.render("mensaje", { mensaje: "Error al desactivar la mesa: " + err.message });
    next(err);
  }
});


router.use(errorMiddleware);

module.exports = router;

/*
*/