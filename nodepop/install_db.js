"use strict";

var fs = require("fs");

require("./models/anuncios-Model.js");
require("./models/usuarios-Model.js");

var sha = require("sha256");
var mongoose = require("mongoose");
var Anuncios = mongoose.model("Anuncios");
var Usuarios = mongoose.model("Usuarios");



function cargaAnuncios(callback) {
    //anuncios.remove({});
    Anuncios.remove({}, function(err) {
        if (err) {
            return callback(err);
        }
        console.log("Anuncios eliminados");

        fs.readFile("./anuncios.json", { encoding: "utf8" }, function(err, data) {
            if (err) {
                console.log("Ha habido un error: \n", err);
            } else {
                var listaAnuncios = JSON.parse(data); 

                //Recorremos el array
                for (var i in listaAnuncios.anuncios) {
                    var anuncio = new Anuncios(listaAnuncios.anuncios[i]);
                    anuncio.save(function(err) {

                        if (err) {
                            console.log("Ha ocurrido un error con el anuncio", err);
                            return;
                        }
                        console.log("Anuncio guardado con éxito");
                    });
                }
            }
            console.log("FIN");
        });
    });
}

function cargaUsuarios(callback) {
    //anuncios.remove({});
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
                console.log(typeof(listaUsuarios)); 

                // Recorremos el array
                for (var i in listaUsuarios.usuarios) {
                    var usuario = new Usuarios(listaUsuarios.usuarios[i]);
                    console.log(usuario.clave);
                    usuario.clave = sha(usuario.clave);

                    usuario.save(function(err) {
                        if (err) {
                            console.log("Ha ocurrido un error con el usuario", err);
                            return;
                        }
                        console.log("Usuario guardado con éxito");
                    });
                }
            }
            console.log("FIN");
        });
    });
}

cargaAnuncios(function(err, anuncios) {
    if (err) {
        console.log("Ha ocurrido un error", err);
        return;
    }
    console.log("Anuncios cargados", anuncios);
});

cargaUsuarios(function(err, usuarios) {
    if (err) {
        console.log("Ha ocurrido un error", err);
        return;
    }
    console.log("Usuarios cargados", usuarios);
});