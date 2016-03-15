"use strict"

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Usuario = mongoose.model("Usuarios");

// Get user listing
router.get('/', function(req, res) {

    var nombre = req.query.nombre || '';

    Usuario.list(nombre, function(err, rows) {

        if (err) {
            res.json({ result: false, err: err });
            return;
        }

        // Cuando esten disponibles los mando en JSON
        // console.log("Usuarios", rows);
        res.render('usuarios-form', { usuarios: rows});
        // res.json({ result: true, rows: rows });
    });
});

router.post('/', function(req, res) {

    // Instaciamos objeto en memoria
    var usuario = new Usuario(req.body);
    // Lo guardamos en la Base de Datos
    usuario.save(function(err, newRow) {
        if (err) {
            res.json({ result: false, err: err });
            return;
        }
        res.json({ result: true, row: newRow });
    });
});

module.exports = router;