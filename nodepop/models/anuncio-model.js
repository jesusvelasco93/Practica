"use strict";

// Conectar con driver
// Conecctar con la base de datos

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

anuncioSchema.statics.list = function(parametros, cb){

    // Creamos un objeto para añadir los parametros a la busqueda
    var criteria = {}

    // Añadimos los parametros que nos han mandado

    // Parametro venta
    if (parametros.venta === "true" || parametros.venta === "false"){
        criteria = {
            venta: parametros.venta
        }
    }

    // Parametro Precio exacto
    if (parametros.precio != '-'){
        criteria = {
            precio : parametros.precio
        }
    }

    // Parametro PrecioMin
    if (parametros.precioMin != '-'){
        criteria = {
            precio : {
                $gte: parametros.precioMin
            }
        }
    }

    // Parametro PrecioMax
    if (parametros.precioMax != '-'){
        criteria = {
            precio : {
                $lte: parametros.precioMax
            }   
        }
    }

    // Parametro Tag
    if (parametros.tag != ''){
        criteria = {
            tags: parametros.tag.toLowerCase()
            
        }  
    }

    // Parametro Nombre
    if (parametros.nombre != ''){
        criteria = {
            nombre: parametros.nombre
        }
    }

    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    // Hacemos la busqueda con los parametros finales
    var query = Anuncio.find(criteria);
    var numElemTotal = 0;

    // Añadimos mas parámetros a la query
    query.sort(parametros.sort);
    query.skip(parametros.inicio);
    query.limit(parametros.limit);

    // La ejecutamos
    query.exec(function(err, rows) {

        // Devolvemos error
        if (err) {
            cb(err);
            return;
        }
        // var numElemMostrados = rows.length;

        // O devolvemos los resultados
        cb(null, rows);
    });
};

anuncioSchema.statics.listTags = function(cb){

    // Creamos un array donde guardaremos los tags
    var array = [];

    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    var query = Anuncio.find({});

    // La ejecutamos
    query.exec(function(err, rows){

        // Devolvemos error
        if (err){
            cb(err);
            return;
        }

        // Añadimos al array los tags del array sin repetir
        for (var i in rows){
            array = array.concat(rows[i].tags.filter(function(item){
                return array.indexOf(item) < 0;
            }));;
        }

        // Devolvemos los resultados
        cb(null, array.sort());
    });
};

// Lo registro en mongoose
var Anuncio = mongoose.model("Anuncios", anuncioSchema);
