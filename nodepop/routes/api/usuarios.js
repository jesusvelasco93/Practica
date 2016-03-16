"use strict"

var sha = require("sha256");
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Usuario = mongoose.model("Usuarios");

// Get user listing
router.get('/', function(req, res) {

    Usuario.list(function(err, rows) {

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
    if (req.body.nombre !== "" && req.body.clave !== "" && req.body.email !== ""){

        var user = {}
        Usuario.findOne({nombre: req.body.nombre.toLowerCase()}, function(err, row){

            if (err) {
                res.json({ result: false, err: err });
                return;
            }
            console.log("NOMBRE: ", req.body.nombre.toLowerCase());

            if (!row) {
                Usuario.findOne({email: req.body.email}, function(err, rowEmail){
                    if (!rowEmail){
                        user = {
                            nombre: req.body.nombre.toLowerCase() || "",
                            clave: sha(req.body.clave) || "",
                            email: req.body.email || ""
                        }
                        if (user.nombre !== "" && user.clave !== "" && user.email !== ""){
                            var usuario = new Usuario(user);
                            usuario.save(function(err, newRow) {
                                if (err) {
                                    res.json({ result: false, err: err });
                                    return;
                                }
                                res.json({ result: true, row: newRow });
                            });
                        }
                        else{
                            res.json({ result: false, err: "Rellene todos los campos"});
                        }
                    }
                    else{
                        res.json({ result: false, err: "Email ya registrado"});
                    }
                });
            }
            else {
                res.json({ result: false, err: "Usuario ya existente"});
            } 
        });
    }
    else {
        res.json({ result: false, err: "Campos vacios"});
    }
});

module.exports = router;