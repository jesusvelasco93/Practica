"use strict";

var fs = require("fs");
var async = require("async");

require("./models/anuncio-model");
require("./models/usuario-model");

var sha = require("sha256");
var mongoose = require("mongoose");
var Anuncios = mongoose.model("Anuncios");
var Usuarios = mongoose.model("Usuarios");



function cargaAnuncios(callback) {

    Anuncios.remove({}, function(err) {
        if (err) {
            return callback(err);
        }
        console.log("Anuncios eliminados");

        fs.readFile("./anuncios.json", { encoding: "utf8" }, function(err, data) {
            if (err) {
                console.log("Ha habido un error:", err);
            } else {
                var listaAnuncios = JSON.parse(data);

                //Recorremos el array
                async.each(listaAnuncios.anuncios, function(anuncioNew, callback) {
                    var anuncio = new Anuncios(anuncioNew);
                    anuncio.save(function(err) {

                        if (err) {
                            callback("Ha ocurrido un error con el anuncio");
                            return;
                        }
                        console.log("Anuncio guardado con éxito " + anuncio.nombre);
                        callback();
                    });
                }, function(err) {

                    if (err) {
                        console.log('Ha occurrido un error en el proceso');
                    } else {
                        console.log('Todos los Anuncios guardados');
                    }
                });
            }
        });
    });
}

function cargaUsuarios(callback) {

    Usuarios.remove({}, function(err) {
        if (err) {
            return callback(err);
        }
        console.log("Usuarios eliminados");

        fs.readFile("./usuarios.json", { encoding: "utf8" }, function(err, data) {
            if (err) {
                console.log("Ha habido un error: ", err);
            } else {
                var listaUsuarios = JSON.parse(data);
                // Recorremos el array

                async.each(listaUsuarios.usuarios, function(usuarioNew, callback) {

                    var usuario = new Usuarios(usuarioNew);
                    usuario.clave = sha(usuario.clave);

                    usuario.save(function(err) {
                        if (err) {

                            callback("Ha ocurrido un error con el usuario");
                        }
                        console.log("Usuario guardado con éxito " + usuario.nombre);
                        callback();
                    });
                }, function(err) {

                    if (err) {
                        console.log('Ha occurrido un error en el proceso');
                    } else {
                        console.log('Todos los Usuarios guardados');
                    }
                });
            }
        });
    });
}

cargaAnuncios(function(err, anuncios) {
    console.log("Inicio cargaAnuncios");
    if (err) {
        console.log("Ha ocurrido un error", err);
        return;
    }
    console.log("Anuncios cargados", anuncios);
});

cargaUsuarios(function(err, usuarios) {
    console.log("Inicio cargaUsuarios");
    if (err) {
        console.log("Ha ocurrido un error", err);
        return;
    }
    console.log("Usuarios cargados", usuarios);
});