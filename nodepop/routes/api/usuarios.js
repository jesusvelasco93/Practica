'use strict';

var sha = require('sha256');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuarios');


router.post('/', function(req, res) {

    if (req.body.nombre !== '' && req.body.clave !== '' && req.body.email !== ''){

        var user = {};
        Usuario.findOne({nombre: req.body.nombre.toLowerCase()}, function(err, row){

            if (err) {
                res.json({ result: false, err: err });
                return;
            }
            console.log('NOMBRE: ', req.body.nombre.toLowerCase());

            if (!row) {
                Usuario.findOne({email: req.body.email}, function(err, rowEmail){
                    if (!rowEmail){
                        user = {
                            nombre: req.body.nombre.toLowerCase() || '',
                            clave: sha(req.body.clave) || '',
                            email: req.body.email || ''
                        };
                        if (user.nombre !== '' && user.clave !== '' && user.email !== ''){
                            var usuario = new Usuario(user);
                            usuario.save(function(err, newRow) {
                                if (err) {
                                    res.json({ result: false, err: err });
                                    return;
                                }
                                res.json({ result: true, nombre: newRow.nombre, clave: '******', email: newRow.email });
                            });
                        }
                        else{
                            res.json({ result: false, err: 'Rellene todos los campos'});
                        }
                    }
                    else{
                        res.json({ result: false, err: 'Email ya registrado'});
                    }
                });
            }
            else {
                res.json({ result: false, err: 'Usuario ya existente'});
            } 
        });
    }
    else {
        res.json({ result: false, err: 'Campos vacios'});
    }
});

module.exports = router;