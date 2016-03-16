"use strict"

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncios");
var auth = require("../../lib/auth");

router.use(auth());

// Get user listing
router.get('/', function(req, res) {

    var precioMin = '-';
    var precioMax = '-';

    //Si tiene precio y tiene un guion
    if (req.query.precio && req.query.precio.indexOf('-') != -1){
         let rango = req.query.precio.split("-");

         // Si tiene valor y es numerico el primer fragmento
         if (rango[0] && !isNaN(rango[0])){
             precioMin = rango[0];
         }

         // Si tiene valor y es numerico el segundo fragmento
         if (rango[1] && !isNaN(rango[1])){
             precioMax = rango[1];
        }
        console.log(precioMin, rango[0]);
        console.log(precioMax, rango[1]);
    }

    if (req.query.nombre){
        var nombre = new RegExp('^' + req.query.nombre, "i")
    }
    else var nombre = "";

    var parametros = {
        sort: req.query.sort || 'nombre',
        venta: req.query.venta || '',
        tag: req.query.tag || '',
        nombre: nombre,
        precioMin: precioMin,
        precioMax: precioMax,
        inicio: req.query.inicio || 0,
        limit: req.query.limit || 2
    };  

    Anuncio.list(parametros, function(err, rows) {

        if (err) {
            res.json({ result: false, err: err });
            return;
        }
        Anuncio.listTags(function(err,tags){
            if (err) {
                res.json({ result: false, err: err });
                return;
            }
            // console.log(tags);

            res.render('anuncios_form', { anuncios: rows, listaTags: tags});
        });
        // Cuando esten disponibles los mando en JSON
        /*console.log("Datos", rows);*/

        // res.json({ result: true, rows: rows });
    });
});

router.post('/', function(req, res) {

    Anuncio.findOne({nombre: new RegExp('^' + req.body.nombre, "i")}, function(err, row){
        if (!row){
            // Instaciamos objeto en memoria
            var anuncio = new Anuncio(req.body);
            for (var i in anuncio.tags){
                anuncio.tags[i] = anuncio.tags[i].toLowerCase();
            }
            console.log(anuncio);
            // Lo guardamos en la Base de Datos
            anuncio.save(function(err, newRow) {
                if (err) {
                    res.json({ result: false, err: err });
                    return;
                }
                res.json({ result: true, row: newRow });
            });
        }
        else {
            res.json({ result: false, err: "Anuncio ya existente"});
        }
    });
});

module.exports = router;
