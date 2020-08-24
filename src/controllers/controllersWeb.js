//Cici's 

const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Product = db.Product;
<<<<<<< HEAD
const Category = db.Category;
=======
>>>>>>> c04708e56363d6b02b0ae9276aed0576fe8366e6

module.exports = {
    index: function(req,res){
        products = Product.findAll()
        categories = Category.findAll()
        .then(products =>{
            
            res.render(path.resolve(__dirname, '..','views','web','index'), {products, categories});
        })           
        .catch(error => res.send(error))
    },
    
    nosotros: function(req,res){
        res.sendFile(path.resolve(__dirname, '..', 'views','web','nosotros.ejs'))
    },
    contacto: function(req,res){
        res.sendFile(path.resolve(__dirname, '..', 'views','web','contacto.ejs'))
    }
<<<<<<< HEAD
}

=======
}
>>>>>>> c04708e56363d6b02b0ae9276aed0576fe8366e6
