const express = require('express');
const path = require('path');
const logger = require('morgan');
var app = express();
const sequelize = require('./db/sequelize');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const createError = require('http-errors');
const { Sequelize } = require('sequelize');
const logMiddleware = require("./middlewares/logMiddleware"); 
const obrasRoutes = require("./routes/obras");
const { body, validationResult } = require('express-validator');
const logRoutes = require("./routes/logs");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "public/image")));

// Asegúrate de que el middleware de log se use antes de las rutas
app.use(logMiddleware); 

// Cargar las rutas
app.use("/obras", obrasRoutes);

// Rutas
const indexRoutes = require("./routes/index");

app.use("/", indexRoutes);

app.use("/logs", logRoutes);

// Error 404 (colocarlo después de las rutas)
app.use(function (req, res, next) {
    next(createError(404));
});

// Manejo de errores
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Renderiza la página de error
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = app;
