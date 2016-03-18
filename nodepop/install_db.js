"use strict";

var fs = require("fs");
var async = require("async");

require("./models/anuncio-model");
require("./models/usuario-model");

var sha = require("sha256");
var mongoose = require("mongoose");
var Anuncios = mongoose.model("Anuncios");
var Usuarios = mongoose.model("Usuarios");

function borrarAnuncios() {
    return new Promise(function(resolve, reject){
        Anuncios.remove({}, function(err) {
            if (err) {
                reject("Error");
            }
            console.log("Anuncios borrados");
            resolve("Hecho");
        });
    });
}
function borrarUsuarios() {
    return new Promise(function(resolve, reject){
        Usuarios.remove({}, function(err) {
            if (err) {
                reject("Error");
            }
            console.log("Usuarios borrados");
            resolve("Hecho");
        });
    });
}

function cargaAnuncios() {
    console.log("Empiezo a cargar Anuncios");
    return new Promise(function(resolve, reject){
        fs.readFile("./anuncios.json", { encoding: "utf8" }, function(err, data) {
            if (err) {
                reject("Error");
            } else {
                var listaAnuncios = JSON.parse(data);

                //Recorremos el array
                async.each(listaAnuncios.anuncios, function(anuncioNew, next) {
                    var anuncio = new Anuncios(anuncioNew);
                    anuncio.save(function(err) {

                        if (err) {
                            next("Ha ocurrido un error con el anuncio");
                        }
                        console.log("Anuncio guardado con éxito " + anuncio.nombre);
                        next();
                    });
                }, function(err) {

                    if (err) {
                        console.log('Ha occurrido un error en el proceso');
                        return reject("Error");
                    } else {
                        console.log('Todos los Anuncios guardados');
                        return resolve("Hecho");
                    }
                });
            }
        });
    });
}

function cargaUsuarios() {
    console.log("Empiezo a cargar Usuarios");
    return new Promise(function(resolve, reject){
        fs.readFile("./usuarios.json", { encoding: "utf8" }, function(err, data) {
            if (err) {
                reject("Error");
            } else {
                var listaUsuarios = JSON.parse(data);

                //Recorremos el array
                async.each(listaUsuarios.usuarios, function(usuarioNew, next) {
                    var usuario = new Usuarios(usuarioNew);
                    usuario.save(function(err) {

                        if (err) {
                            next("Ha ocurrido un error con el Usuario");
                        }
                        console.log("Usuario guardado con éxito " + usuario.nombre);
                        next();
                    });
                }, function(err) {

                    if (err) {
                        console.log('Ha occurrido un error en el proceso');
                        return reject("Error");
                    } else {
                        console.log('Todos los Usuarios guardados');
                        return resolve("Hecho");
                    }
                });
            }
        });
    });
}

borrarUsuarios()
    .then(cargaUsuarios)
    .then(borrarAnuncios)
    .then(cargaAnuncios)
    .catch(function(err){
        console.log("Error", err);
});