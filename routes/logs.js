const express = require("express");
const router = express.Router();
const Log = require("../models/log.entity");


router.get("/", async (req, res) => {
  try {
    const logs = await Log.findAll(); 
    res.render("logs", { logs }); 
  } catch (error) {
    console.error("Error al obtener los logs:", error);
    res.status(500).send("Error al obtener los logs.");
  }
});

module.exports = router;
