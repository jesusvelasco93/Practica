"use strict";

// conectar con driver
// var basedatos = require('../lib/connectMongo');

require('../lib/connectMongoose');
var mongoose = require('mongoose');

// Creo el esquema
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

usuarioSchema.statics.list = function(cb){
    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    var query = Usuario.find({});

    // Añadimos mas parámetros a la query

    // La ejecutamos
    query.exec(function(err, rows){
        if (err){
            cb(err);
            return;
        }
        // console.log(rows);
        cb(null, rows);
    });
};


// Lo registro en mongoose
var Usuario = mongoose.model("Usuarios", usuarioSchema);