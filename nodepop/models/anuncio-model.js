"use strict";

// conectar con driver
// var basedatos = require('../lib/connectMongo');

//conecctar con
var conn = require('../lib/connectMongoose');
var mongoose = require('mongoose');

// Creo el esquema
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = function(sort, cb) {
    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    var query = Anuncio.find({});

    // Añadimos mas parámetros a la query
    query.sort(sort);
    // La ejecutamos
    query.exec(function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        console.log(rows);
        cb(null, rows);
    });
};


// Lo registro en mongoose
var Anuncio = mongoose.model("Anuncios", anuncioSchema);
