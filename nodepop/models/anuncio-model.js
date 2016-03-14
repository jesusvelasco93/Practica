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

anuncioSchema.statics.list = function(sort, inicio, limit, venta, cb) {
    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    console.log(venta);
    if (venta === "true" || venta === "false"){
        var query = Anuncio.find({venta: venta});
        console.log("Aqui");
    }
    else {
        var query = Anuncio.find({});
    }

    // Añadimos mas parámetros a la query
    query.sort(sort);
    query.skip(inicio);
    query.limit(limit);

    // console.log("sort: ", parametros.sort, "inicio: ", parametros.inicio, "limit:", parametros.limit);

    // La ejecutamos
    query.exec(function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        // console.log(rows);
        cb(null, rows);
    });
};


// Lo registro en mongoose
var Anuncio = mongoose.model("Anuncios", anuncioSchema);
