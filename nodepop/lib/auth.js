"use strict";

var basicAuth = require("basic-auth");
var mongoose = require("mongoose");
var Usuario = mongoose.model("Usuarios");
var encontrado = false;

// Autenticacion con basic-auth
var fn = function() {

    return function(req, res, next) {
        var userRequest = basicAuth(req);

        if (!userRequest || userRequest.name === "" || userRequest.pass === "") {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.send(401);
            return;
        }

        var nombre = userRequest.name;
        var clave = userRequest.pass;

        console.log(nombre, clave);

        Usuario.list(nombre, function(err, rows) {

            if (err) {
                res.set("Error para recuperar");
                res.send(401);
                return;
            }
            console.log(rows);
            for (var i in rows) {
                if (rows[i].clave === clave) {
                    encontrado=true;
                    next();
                }
            }
            if (!encontrado){
                 res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                 res.send(401);
                 return;
            }
        });
    };
};

module.exports = fn;
