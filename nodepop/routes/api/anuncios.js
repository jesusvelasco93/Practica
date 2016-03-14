"use strict"

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncios");
// var auth = require("../../../lib/auth");

// router.use(auth("admin", "pass2"));

// Get user listing
router.get('/', function(req, res) {

    var sort = req.query.sort || 'nombre';

    Anuncio.list(sort, function(err, rows) {

        if (err) {
            res.json({ result: false, err: err });
            return;
        }

        // Cuando esten disponibles los mando en JSON
        console.log("Datos", rows);
        res.render('anuncios_form', { anuncios: rows});
        // res.json({ result: true, rows: rows });
    });
});

router.post('/', function(req, res) {

    // Instaciamos objeto en memoria
    var anuncio = new Anuncio(req.body);
    // Lo guardamos en la Base de Datos
    anuncio.save(function(err, newRow) {
        if (err) {
            res.json({ result: false, err: err });
            return;
        }
        res.json({ result: true, row: newRow });
    });
});

module.exports = router;
