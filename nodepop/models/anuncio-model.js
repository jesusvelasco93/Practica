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

anuncioSchema.statics.list = function(parametros, cb){
    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    // Vemos los parametros que nos pasan
    var criteria = {}
    // var paginacion = {
    //     paginaActual = parametros.inicio,
    //     numElementosPorPagina = parametros.limit,
    //     numPaginas = Anuncio.find()/parametros,
    // }

    // Añadimos los parametros que nos han mandado

    // Parametro venta
    if (parametros.venta === "true" || parametros.venta === "false"){
        criteria = {
            venta: parametros.venta
        }
    }

    // Parametro PrecioMin
    if (parametros.precioMin != '-'){
        criteria = {
            precio : {
                $gte: parametros.precioMin
            }
        }
        console.log("precio min");
    }


    // Parametro PrecioMax
    if (parametros.precioMax != '-'){
        criteria = {
            precio : {
                $lte: parametros.precioMax
            }   
        }
        console.log("precio max");
    }
    // console.log(criteria.precio);

    // Parametro Tag
    if (parametros.tag != ''){
        // var tag = '/^' + parametros.tag + '/i';
        criteria = {
            tags: parametros.tag.toLowerCase()
            // {
            //     $regex: tag
            // }
            
        }  
    }

    // Parametro Nombre
    if (parametros.nombre != ''){
        criteria = {
            //Añadir Expresion Regular
            nombre: parametros.nombre
        }
    }

    // Hacemos la busqueda con los parametros finales
    var query = Anuncio.find(criteria);
    var numElemTotal = 0;

    // Añadimos mas parámetros a la query
    query.sort(parametros.sort);
    query.skip(parametros.inicio);
    query.limit(parametros.limit);

    console.log("sort: ", parametros.sort, "inicio: ", parametros.inicio, "limit:", parametros.limit);

    // La ejecutamos
    query.exec(function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        var numElemMostrados = rows.length;
        cb(null, rows);
    });
};

anuncioSchema.statics.listTags = function(cb){
    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    // let arraye = [];
    var array = [];
    var query = Anuncio.find({});
    // Añadimos mas parámetros a la query

    // La ejecutamos
    query.exec(function(err, rows){
        if (err){
            cb(err);
            return;
        }
        for (var i in rows){
            array = array.concat(rows[i].tags.filter(function(item){
                return array.indexOf(item) < 0;
            }));;
        }
        cb(null, array.sort());
    });
};


// Lo registro en mongoose
var Anuncio = mongoose.model("Anuncios", anuncioSchema);
