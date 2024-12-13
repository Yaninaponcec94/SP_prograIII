const express = require("express");
const router = express.Router();
const ObraDeArte = require("../models/ObraDeArte.entity"); 
const upload = require("../storage/storage"); 
const validate = require("../middlewares/validate"); 

// POST - Crear una nueva ObraDeArte
router.post("/", upload.single("imagen"), validate.createObra, async (req, res) => {
  try {
    const { nombre, anioDeCreacion, tipo } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const nuevaObra = await ObraDeArte.create({
      nombre,
      anioDeCreacion,
      tipo,
      imagen,
    });

    res.status(201).json(nuevaObra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const obras = await ObraDeArte.findAll({
      where: { activo: true }, 
    });

    res.render("obras/list", { obras });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", validate.updateObra, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, anioDeCreacion, tipo } = req.body;

    const obra = await ObraDeArte.findByPk(id);

    if (!obra) {
      return res.status(404).json({ error: "Obra no encontrada" });
    }

    obra.nombre = nombre;
    obra.anioDeCreacion = anioDeCreacion;
    obra.tipo = tipo;

    await obra.save();

    res.status(200).json(obra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", validate.idObra, async (req, res) => {
  try {
    const { id } = req.params;

    const obra = await ObraDeArte.findByPk(id);

    if (!obra) {
      return res.status(404).json({ error: "Obra no encontrada" });
    }

    obra.activo = false;
    await obra.save();

    res.status(200).json({ message: "Obra dada de baja lógica" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//REACTIVA una baja logica
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const obra = await ObraDeArte.findByPk(id);

    if (!obra) {
      return res.status(404).json({ message: 'Obra no encontrada' });
    }

    if (!obra.activo) {
      obra.activo = true;
      await obra.save();
      return res.status(200).json({ message: 'Obra reactivada' });
    }

    res.status(200).json({ message: 'La obra ya está activa' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
