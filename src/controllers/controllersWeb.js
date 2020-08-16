//Cici's 

const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Product = db.Product;

module.exports = {
    index: function(req,res){
        Product.findAll()
            .then(products => res.render(path.resolve(__dirname, '..', 'views','web','index'),{products}))
            .catch(err => res.send(err))
    },
    nosotros: function(req,res){
        res.sendFile(path.resolve(__dirname, '..', 'views','web','nosotros.ejs'))
    },
    contacto: function(req,res){
        res.sendFile(path.resolve(__dirname, '..', 'views','web','contacto.ejs'))
    }
}