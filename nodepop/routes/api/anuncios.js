"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncios");
var auth = require("../../lib/auth");

router.use(auth());

// Get anuncios listing
router.get('/', function(req, res) {

    var precioMin = '-';
    var precioMax = '-';
    var precio = '-';

    // Si tiene precio y tiene un guion
    if (req.query.precio) {
        if (req.query.precio.indexOf('-') != -1) {
            var rango = req.query.precio.split("-");

            // Si tiene valor y es numerico el primer fragmento
            if (rango[0] && !isNaN(rango[0])) {
                precioMin = rango[0];
            }

            // Si tiene valor y es numerico el segundo fragmento
            if (rango[1] && !isNaN(rango[1])) {
                precioMax = rango[1];
            }
            console.log(precioMin, rango[0]);
            console.log(precioMax, rango[1]);
        }

        // Si no comprabamos si ha introducido un número
        // Si lo es lo guardamos   
        else {
            if (!isNaN(parseInt(req.query.precio))) {
                precio = parseInt(req.query.precio);
            }
        }
    }

    // Establecemos un expresión regular para el nombre con lo que nos ha introducido
    var nombre = "";
    if (req.query.nombre) {
        nombre = new RegExp('^' + req.query.nombre, "i");
    }

    // Objeto que le pasamos al list, con los basicos si no vienen en la query
    var parametros = {
        sort: req.query.sort || 'nombre',
        venta: req.query.venta || '',
        tag: req.query.tag || '',
        nombre: nombre,
        precio: precio,
        precioMin: precioMin,
        precioMax: precioMax,
        inicio: req.query.inicio || 0,
        limit: req.query.limit || 0
    };

    // Llamamos a la busqueda con estos parametros y se lo devolvemos o renderizamos a la vista
    Anuncio.list(parametros, function(err, rows) {

        if (err) {
            res.json({ result: false, err: err });
            return;
        }

        // res.json({ result: true, anuncios: rows });
        res.render('anuncios_form', { anuncios: rows });
    });
});

// Get tags listing
router.get('/tags', function(req, res) {
    Anuncio.listTags(function(err, tags) {
        if (err) {
            res.json({ result: false, err: err });
            return;
        }

        // res.json({ result: true, anuncios: tags });
        res.render('tags_form', { listaTags: tags });
    });
});

// Post anuncios
router.post('/', function(req, res) {

    //Comprobamos que no haya ninguno repetido
    Anuncio.findOne({ nombre: new RegExp('^' + req.body.nombre + '$', "i") }, function(err, row) {

        // Si no ha encontrado ninguno 
        if (!row) {

            // Instaciamos objeto en memoria
            var anuncio = new Anuncio(req.body);

            // Verificamos que no hay campos vacios
            if (anuncio.nombre !== "" && anuncio.precio !== "" && anuncio.venta !== "" && anuncio.foto !== "" && anuncio.tags.length !== 0) {
                for (var i in anuncio.tags) {
                    if (anuncio.tags){
                        anuncio.tags[i] = anuncio.tags[i].toLowerCase();
                    }
                }

                // Lo guardamos en la Base de Datos
                anuncio.save(function(err, newRow) {
                    if (err) {
                        res.json({ result: false, err: err });
                        return;
                    }
                    res.json({ result: true, row: newRow });
                });
            } else {
                res.json({ result: false, err: "Campos Vacios" });
            }
        } else {
            res.json({ result: false, err: "Anuncio ya existente" });
        }
    });
});

module.exports = router;
