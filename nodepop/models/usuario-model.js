// "use strict";

// // conectar con driver
// // var basedatos = require('../lib/connectMongo');

// //conecctar con
// var conn = require('../lib/connectMongoose');
// var mongoose = require('mongoose');

// // Creo el esquema
// var usuarioSchema = mongoose.Schema({
//     nombre: String,
//     email: String,
//     clave: String
// });

// usuarioSchema.statics.list = function(sort, cb){
//     // Preparamos la Query sin ejecutarla (No ponemos callback a find)
//     var query = Usuario.find({});

//     // Añadimos mas parámetros a la query
//     query.sort(sort);
//     // La ejecutamos
//     query.exec(function(err, rows){
//         if (err){
//             cb(err);
//             return;
//         }
//         cb(null, rows);
//     });
// };


// // Lo registro en mongoose
// var Usuario = mongoose.model("Usuario", usuarioSchema);