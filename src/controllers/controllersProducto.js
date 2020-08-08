const path = require('path');
const fs = require('fs');
const db = require('../database/models')
const Product = db.Product;

//destructuring
//const {Model1, Model2} = require('../database/models')

module.exports = {
    index: function(req,res){
        Product.findAll() //select * from products
        .then(products =>{ res.render(path.resolve(__dirname, '..', 'views','productos','productos'),{products})})
    .catch(error => res.send(error))
    },
}


/* Class on Friday 8-7-2020 Sprint 5 Notes: 

index: function(req,res){
    const platos = Dish.findAll();
    const categorias = Category.findAll();
    Promise.all([platos,categorias])
    .then(([platos,categorias]) =>{
        res.render(path.resolve(_dirname , '..', 'views', 'productos', 'productos'), {platos, categorias});
    })
    .catch(error => res.send(error))
},


//when you want to see detalle del producto
show: (req, res) => {
    Dish
    .findByPk(req.params.id, {
        include: ['category']
    })
    .then(platoComida =>{
        res.render(path.resolve(_dirname , '..', 'views', 'productos', 'detail'), {platoComida});
    })
}

*/







