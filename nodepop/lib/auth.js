"use strict";

var sha = require("sha256");
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

        var nombreUsuario = {nombre: userRequest.name.toLowerCase().toString()};
        var clave = userRequest.pass;

        console.log(nombreUsuario.nombre, clave);

        Usuario.findOne(nombreUsuario, function(err, user) {

            if (err) {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                res.send(401);
                return;
            }
            // console.log(rows);
            if (user && user.clave === sha(clave)) {
                    encontrado=true;
                    next();
            }
            else {
                 res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                 res.send(401);
                 return;
            }
        });
    };
};

module.exports = fn;
