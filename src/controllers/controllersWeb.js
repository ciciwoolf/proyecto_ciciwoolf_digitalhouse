const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Product = db.Product;


module.exports = {
    index: function(req,res){
        products = Product.findAll()
           .then(products =>{
            
            res.render(path.resolve(__dirname, '..','views','web','index'), {products});
        })           
        .catch(error => res.send(error))
    },
    
    nosotros: function(req,res){
           res.render(path.resolve(__dirname, '..','views','web','nosotros'))
    },
    contacto: function(req,res){
        res.render(path.resolve(__dirname, '..', 'views','web','contacto'))
    }
}

