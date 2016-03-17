"use strict";

var fs = require("fs");

require("./models/anuncios-Model.js");
require("./models/usuarios-Model.js");

var sha = require("sha256");
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncios");
var User = mongoose.model("Usuarios");



function cargaAnunciosDefect(callback) {
    //anuncios.remove({});
    Anuncio.remove({}, function(err) {
        if (err) {
            return cb(err);
        }
        console.log("Anuncios eliminados");
        fs.readFile("./anuncios.json", { encoding: "utf8" }, function(error, data) {
            if (error) {
                console.log("Ha habido un error: \n", err);
            } else { //o lanzar excepción o return; o return console.log(...);
                var defecto = JSON.parse(data); //ahora recorremos el array
                for (var i = 0; i < defecto.anuncios.length; i++) {
                    var anuncio = new Anuncio(defecto.anuncios[i]);
                    anuncio.save(function(err, saved) {
                        //console.log("Los datos del anuncio son", data.anuncios[i]);
                        if (err) {
                            console.log("Ha ocurrido un error con el anuncio", err);
                            return;
                        }
                        console.log("Anuncio guardado con éxito");
                    });
                }
            }
            console.log(defecto);
            console.log("FIN");
        });
    });

}

function cargaUsuariosDefect(callback) {
    //anuncios.remove({});
    User.remove({}, function(err) {
        if (err) {
            return cb(err);
        }
        console.log("Usuarios eliminados");
        fs.readFile("./usuarios.json", { encoding: "utf8" }, function(error, data) {
            if (error) {
                console.log("Ha habido un error: \n", err);
            } else { //o lanzar excepción o return; o return console.log(...);
                var defecto = JSON.parse(data); //ahora recorremos el array
                for (var i = 0; i < defecto.usuarios.length; i++) {
                    var user = new User(defecto.usuarios[i]);
                    console.log(user["clave"]);
                    user.clave = passwordHash.generate(user["clave"]);
                    user.save(function(err, saved) {
                        //console.log("Los datos del anuncio son", data.anuncios[i]);
                        if (err) {
                            console.log("Ha ocurrido un error con el usuario", err);
                            return;
                        }

                        console.log("Usuario guardado con éxito");
                    });
                }
            }
            console.log(defecto);
            console.log("FIN");
        });
    });

}


cargaAnunciosDefect(function(err, str) {
    if (err) {
        console.log("Ha ocurrido un error: \n", err);
        return;
    }
    console.log("Anuncios por defecto cargados \n ", str);

});

cargaUsuariosDefect(function(err, str) {
    if (err) {
        console.log("Ha ocurrido un error: \n", err);
        return;
    }
    console.log("Usuarios por defecto cargados \n ", str);

});