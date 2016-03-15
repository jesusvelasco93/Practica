"use strict";

var basicAuth = require("basic-auth");
var mongoose = require("mongoose");
var Usuario = mongoose.model("Usuarios");

var encontrado = false;
var nombre = "";

// Autenticacion con basic-auth
var fn = function() {

    return function(req, res, next) {
        var userRequest = basicAuth(req);
        if (!userRequest) {
            // if (!userRequest || userRequest.name !== user || userRequest.pass !== pass) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.send(401);
            return;
        }

        var nombreUsuario = userRequest.name.toString().trim();
        var claveUsuario = userRequest.pass.toString().trim();

        var usuarios = "";

        Usuario.list("", function(err, rows) {

            if (err) {
                res.json({ result: false, err: err });
                return;
            }
            usuarios = rows;
            // res.json({ result: true, rows: rows });
        });
        for ( i in usuarios){
            if (usuarios[i].nombre.toString().trim() == nombreUsuario){
                if (usuarios[i].clave.toString().trim() == claveUsuario){
                    console.log("Estoy");
                }
            }
        }
        next();
    };
};

module.exports = fn;
