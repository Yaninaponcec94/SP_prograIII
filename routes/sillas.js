const express = require('express');
const router = express.Router();
const Silla = require('../models/silla.entity');
const Mesa = require('../models/mesa.entity');
const upload = require('../storage/storage');

const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).send("Error del servidor");
};

router.post('/nueva',upload.none(), async (req, res, next) => {
  try {
    const { nombre, cantidad, MesaId } = req.body;  

    const nuevaSilla = await Silla.create({ nombre, cantidad, MesaId }); 

    return res.status(201).json({ silla: nuevaSilla });  
  } catch (error) {
    console.error('Error al crear la silla:', error);
    next(error); 
  }
});


router.get("/", async (req, res, next) => {
  try {
      const sillas = await Silla.findAll({
        where:{
          activo:true,
        }
      }); 
      res.render("sillas", { sillas }); 
  } catch (err) {
      console.error(err);
      next(err); 
  }
});

router.get('/relaciones/:id', async (req, res, next) => {
  const sillaId = req.params.id;

  try {
      const silla = await Silla.findByPk(sillaId, {
          include: {
              model: Mesa,
              as: 'Mesa'
          }
      });

      if (!silla) {
          return res.status(404).send('Silla no encontrada');
      }

      res.render('relaciones-sillas', { silla, mesa: silla.Mesa });
  } catch (err) {
      console.error(err);
      next(err); 
  }
});


router.put('/:id', upload.none(), async (req, res, next) => {
  const sillaId = req.params.id;
  const { nombre, cantidad, MesaId } = req.body; 

  try {
    const silla = await Silla.findByPk(sillaId);
    if (!silla) {
      return res.status(404).send('Silla no encontrada');
    }

    await silla.update({ nombre, cantidad, MesaId });
    res.status(200).json({ mensaje: 'Silla actualizada con éxito', silla });
  } catch (error) {
    console.error('Error al actualizar la silla:', error);
    next(error);  
  }
});

router.delete("/:id", async (req, res, next) =>{
  try{
      await Silla.update(
          {activo: false},
          {where: {id:req.params.id}},
      );
      res.render("mensaje", {mensaje: "baja logica"});
  }catch(err){
      res.render("mensaje", {mensaje: err.message });
      next(err); 
  }
});


// Middleware para manejar errores
router.use(errorMiddleware);

module.exports = router;



