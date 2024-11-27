const express = require("express");
const router = express.Router();
const sequelize = require("../db/sequelize");
const controller = require("../controllers/indexController");

router.get("/", (req, res) => {
    res.render("index");
});

module.exports=router; 